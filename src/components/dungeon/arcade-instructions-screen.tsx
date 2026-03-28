"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import { useGameLoop, InputState } from "@/src/hooks/use-game-input";

/* ─────────────────────────────────────────────────────────
 *  ArcadeInstructionsScreen
 *  ───────────────────────────────────────────────────────
 *  Full-screen 3D arcade cabinet with CRT instruction
 *  display and live keyboard visualisation (WASD + Space).
 *
 *  Input Architecture:
 *    The `useGameLoop` hook abstracts raw keys into
 *    semantic actions (up / down / left / right / action / enter).
 *    To add gamepad support later, extend `useInputState`
 *    in `use-game-input.ts` to read from the Gamepad API
 *    and merge that state — no changes needed here.
 * ───────────────────────────────────────────────────────── */

interface Props {
  onStart: () => void;
}

type MapFeature = {
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
  hue: string;
  glow: string;
};

const CONNECTION_LS_KEY = "relic_rush_arcade_connected_call_sign";

const MAP_FEATURES: MapFeature[] = [
  { id: "vault-wall", top: 14, left: 65, width: 25, height: 22, hue: "#a39d8f", glow: "#fff5d4" },
  { id: "skull-altar", top: 33, left: 42, width: 20, height: 16, hue: "#f4f0e3", glow: "#ffd400" },
  { id: "crypt-pool", top: 58, left: 30, width: 32, height: 18, hue: "#4e7164", glow: "#8bffd9" },
  { id: "bone-patch", top: 68, left: 70, width: 18, height: 12, hue: "#bfbcb2", glow: "#f5f5f0" },
  { id: "fungus-tangle", top: 48, left: 15, width: 16, height: 18, hue: "#6fb57a", glow: "#adffd2" },
  { id: "portal-arch", top: 25, left: 17, width: 14, height: 12, hue: "#9da5ff", glow: "#c0e8ff" },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function ArcadeInstructionsScreen({ onStart }: Props) {
  const [exiting, setExiting] = useState(false);
  const [callSign, setCallSign] = useState("NEON-OP");
  const [connected, setConnected] = useState(false);
  const [statusMessage, setStatusMessage] = useState("ENTER CALLSIGN • STANDBY");
  const avatarRef = useRef<HTMLDivElement>(null);
  const mapPositionRef = useRef({ x: 54, y: 64 });
  const canConnect = callSign.trim().length > 0;

  useEffect(() => {
    if (!connected) {
      setStatusMessage(canConnect ? "READY TO CONNECT" : "ENTER CALLSIGN • STANDBY");
    }
  }, [callSign, connected, canConnect]);

  useEffect(() => {
    const saved = localStorage.getItem(CONNECTION_LS_KEY);
    if (saved) {
      setCallSign(saved);
      setConnected(true);
      setStatusMessage(`LINK STABLE • ${saved}`);
    }
  }, []);

  const updateAvatarPosition = useCallback((rawX: number, rawY: number) => {
    const nextX = clamp(rawX, 6, 92);
    const nextY = clamp(rawY, 12, 90);
    mapPositionRef.current = { x: nextX, y: nextY };
    if (avatarRef.current) {
      avatarRef.current.style.left = `${nextX}%`;
      avatarRef.current.style.top = `${nextY}%`;
    }
  }, []);

  useEffect(() => {
    updateAvatarPosition(mapPositionRef.current.x, mapPositionRef.current.y);
  }, [updateAvatarPosition]);

  const handleConnect = useCallback(() => {
    const trimmed = callSign.trim();
    if (!trimmed) {
      setStatusMessage("ENTER CALLSIGN FIRST");
      return;
    }
    setConnected(true);
    setStatusMessage(`LINK STABLE • ${trimmed.toUpperCase()}`);
    localStorage.setItem(CONNECTION_LS_KEY, trimmed.toUpperCase());
  }, [callSign]);

  // DOM refs for each key cap — manipulated directly to avoid re-renders
  const refW = useRef<HTMLDivElement>(null);
  const refA = useRef<HTMLDivElement>(null);
  const refS = useRef<HTMLDivElement>(null);
  const refD = useRef<HTMLDivElement>(null);
  const refSpace = useRef<HTMLDivElement>(null);

  const handleEnter = useCallback(() => {
    if (!connected) {
      handleConnect();
      return;
    }
    if (exiting) return;
    setExiting(true);
    setTimeout(onStart, 600);
  }, [connected, exiting, handleConnect, onStart]);

  // ── Game loop tick ──
  // Reads the decoupled InputState every frame and applies DOM classes.
  const tick = useCallback(
    (input: InputState, delta: number) => {
      const toggle = (el: HTMLDivElement | null, active: boolean) => {
        if (!el) return;
        if (active) el.classList.add("key-pressed");
        else el.classList.remove("key-pressed");
      };

      toggle(refW.current, input.up);
      toggle(refA.current, input.left);
      toggle(refS.current, input.down);
      toggle(refD.current, input.right);
      toggle(refSpace.current, input.action);

      if (input.enter && !exiting) {
        input.enter = false;
        handleEnter();
      }

      if (connected) {
        const step = (delta / 1000) * 32;
        if (step > 0) {
          let dx = 0;
          let dy = 0;
          if (input.left) dx -= step;
          if (input.right) dx += step;
          if (input.up) dy -= step;
          if (input.down) dy += step;
          if (dx !== 0 || dy !== 0) {
            updateAvatarPosition(
              mapPositionRef.current.x + dx,
              mapPositionRef.current.y + dy,
            );
          }
        }
      }
    },
    [connected, exiting, handleEnter, updateAvatarPosition]
  );

  useGameLoop(tick);

  const cabinetRef = useRef<HTMLDivElement>(null);

  // 3D Parallax effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cabinetRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xSkew = (clientX / innerWidth - 0.5) * 6; // ±3 degrees
    const ySkew = (clientY / innerHeight - 0.5) * -6; // ±3 degrees
    cabinetRef.current.style.transform = `rotateX(${ySkew}deg) rotateY(${xSkew}deg)`;
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`fixed inset-0 z-[9999] bg-[#020208] flex items-center justify-center overflow-y-auto pt-10 pb-10 ${
        exiting ? "screen-fade-out" : ""
      }`}
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.06)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,184,0,0.03)_0%,transparent_50%)]" />

      {/* Global CRT overlay */}
      <div className="fixed inset-0 scanlines opacity-10 pointer-events-none z-[200]" />

      {/* ── 3D Arcade Cabinet ── */}
      <div className="arcade-scene w-full max-w-4xl px-4 flex-shrink-0">
        <div 
          ref={cabinetRef}
          className="cabinet-body cabinet-boot relative mx-auto w-full max-w-3xl overflow-hidden"
        >

          {/* ── Left side art strip ── */}
          <div className="hidden md:block absolute -left-3 top-8 bottom-16 w-3 side-strip rounded-l-sm" />
          {/* ── Right side art strip ── */}
          <div className="hidden md:block absolute -right-3 top-8 bottom-16 w-3 side-strip rounded-r-sm" />

          {/* ═══════════ MARQUEE / TOP HEADER ═══════════ */}
          <div className="relative bg-gradient-to-b from-[#1a0a2e] via-[#12081e] to-[#0c0614] border-x-[10px] border-t-[10px] border-[#1a1a2e] rounded-t-lg overflow-hidden">
            {/* Decorative bolts */}
            <div className="absolute top-3 left-4 w-2 h-2 rounded-full bg-[#333] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
            <div className="absolute top-3 right-4 w-2 h-2 rounded-full bg-[#333] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />

            {/* Neon backlit marquee */}
            <div className="py-6 sm:py-8 text-center relative">
              <div className="absolute inset-0 bg-[#0e0f1c]" />
              <h1 className="pixel-text text-2xl sm:text-3xl md:text-4xl text-[#c5c5d3] marquee-neon relative z-10 tracking-wider">
                KHANFLICT
              </h1>
              <p className="pixel-text text-[7px] sm:text-[8px] text-[#8ea1c3] mt-3 tracking-[0.4em] opacity-80 relative z-10">
                198X ARCADE PROTOCOL ● MONAD TESTNET
              </p>
            </div>

            <div className="h-[6px] bg-[#1f2235]" />
          </div>

          {/* ═══════════ CRT SCREEN ═══════════ */}
          <div className="relative bg-[#0d0d12] border-x-[12px] border-[#1a1a2e]">
            {/* Screen bezel with curve effect */}
            <div className="mx-4 sm:mx-6 my-4 sm:my-6 relative crt-bezel p-3 sm:p-5">
              {/* Glass glare effect */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-40 rounded-t-sm" />
              
              {/* The actual CRT display */}
              <div className="crt-screen relative bg-[#020204] border-[4px] border-black rounded-sm overflow-hidden min-h-[500px] flex flex-col">
                {/* Scanline overlay */}
                <div className="absolute inset-0 scanlines pointer-events-none z-30 opacity-40" />
                {/* CRT flicker */}
                <div className="absolute inset-0 crt-flicker pointer-events-none z-30" />
                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-30" />

                {/* ── Screen Content ── */}
                <div className="relative z-10 px-5 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 space-y-6">
                  <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="space-y-6">
                      {/* Mission Briefing */}
                      <div className="text-center space-y-3">
                      <div className="flex items-center justify-center gap-3">
                        <div className="h-[1px] w-8 bg-[#5e6278]/60" />
                        <h2 className="pixel-text text-[9px] sm:text-[10px] text-[#c3b88a] tracking-[0.3em]">
                          MISSION BRIEFING
                        </h2>
                        <div className="h-[1px] w-8 bg-[#5e6278]/60" />
                      </div>
                      <div className="space-y-1">
                        {["BREACH THE MONAD NECROPOLIS.", "RECOVER ANCIENT ARTIFACTS.", "EXTRACT OR PERISH."].map((line) => (
                          <p
                            key={line}
                            className="pixel-text text-[8px] sm:text-[10px] text-[#cad2e7] leading-[2em] tracking-wider"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                      </div>

                      {/* Divider */}
                      <div className="flex items-center gap-3 px-4">
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#8ea1c322] to-transparent" />
                        <span className="pixel-text text-[7px] text-[#8ea1c3]/30 tracking-widest">
                          CONTROLS
                        </span>
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#8ea1c322] to-transparent" />
                      </div>

                      {/* ── Interactive Keys ── */}
                      <div className="flex flex-col items-center gap-4 sm:gap-6">
                        <div className="flex flex-col items-center gap-[6px]">
                          <div
                            ref={refW}
                            className="key-cap w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center border-2 border-[#8ea1c3]/60 bg-[#0a1a2a] text-[#8ea1c3] pixel-text text-sm sm:text-base rounded-[3px] cursor-default"
                            style={{ textShadow: "0 0 2px rgba(0, 0, 0, 0.45)" }}
                          >
                            W
                          </div>
                          <div className="flex gap-[6px]">
                            {(["A", "S", "D"] as const).map((label) => (
                              <div
                                key={label}
                                ref={label === "A" ? refA : label === "S" ? refS : refD}
                                className="key-cap w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center border-2 border-[#8ea1c3]/60 bg-[#0a1a2a] text-[#8ea1c3] pixel-text text-sm sm:text-base rounded-[3px] cursor-default"
                                style={{ textShadow: "0 0 2px rgba(0, 0, 0, 0.45)" }}
                              >
                                {label}
                              </div>
                            ))}
                          </div>
                          <p className="pixel-text text-[7px] text-[#8ea1c3]/40 tracking-[0.2em] mt-1">
                            MOVEMENT
                          </p>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                          <div
                            ref={refSpace}
                            className="space-cap w-48 sm:w-64 h-10 sm:h-12 flex items-center justify-center border-2 border-[#b573c2]/60 bg-[#1a0a2a] text-[#b573c2] pixel-text text-[9px] sm:text-[10px] tracking-[0.2em] rounded-[3px] cursor-default"
                            style={{ textShadow: "0 0 2px rgba(0, 0, 0, 0.45)" }}
                          >
                            ⚔ SPACEBAR
                          </div>
                          <p className="pixel-text text-[7px] text-[#b573c2]/40 tracking-[0.2em]">
                            ATTACK
                          </p>
                        </div>
                      </div>

                      {/* Connection Panel */}
                      <div className="space-y-3">
                        <p className="pixel-text text-[7px] uppercase tracking-[0.4em] text-[#8ea1c3]/40">
                          OPERATOR HANDLE
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                          <input
                            value={callSign}
                            onChange={(event) => setCallSign(event.target.value)}
                            placeholder="ENTER NAME"
                            className="arcade-input-field"
                          />
                          <button
                            type="button"
                            onClick={handleConnect}
                            disabled={!canConnect || connected}
                            className="arcade-input-button"
                          >
                            {connected ? "LINK STABLE" : "CONNECT"}
                          </button>
                        </div>
                        <div className="connection-pill">
                          <span className="text-[8px] uppercase tracking-[0.3em] text-[#8ea1c3]/50">
                            STATUS
                          </span>
                          <p className="font-mono text-[10px] uppercase tracking-[0.4em]">
                            {statusMessage}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Map Column */}
                    <div className="space-y-3">
                      <div className={`arcade-map-holder ${connected ? "map-active" : ""}`}>
                        <div className="arcade-map-grid">
                          {MAP_FEATURES.map((feature) => (
                            <span
                              key={feature.id}
                              className="map-feature"
                              style={{
                                top: `${feature.top}%`,
                                left: `${feature.left}%`,
                                width: `${feature.width}%`,
                                height: `${feature.height}%`,
                                background: feature.hue,
                                boxShadow: `0 0 18px ${feature.glow}`,
                              }}
                            />
                          ))}
                          <div ref={avatarRef} className="map-avatar" />
                        </div>
                        <div className="map-caption">FULL MAP OVERVIEW • SCOUT LOCKED</div>
                      </div>
                      <p className="pixel-text text-[8px] text-[#8ea1c3]/60 leading-tight">
                        We keep the entire dungeon frozen so you can plan each route from the cabinet.
                        Only the scout moves—no camera shake, no AI re-centering—just retro-level clarity.
                      </p>
                    </div>
                  </div>

                  {/* ── Start prompt ── */}
                  <div className="mt-2 text-center space-y-2">
                    <button
                      onClick={handleEnter}
                      disabled={!connected}
                      className={`start-pulse pixel-text text-[10px] sm:text-xs tracking-[0.3em] uppercase border rounded-full px-8 sm:px-12 py-3 sm:py-4 transition-all ${
                        connected
                          ? "text-[#8ea1c3] border-[#8ea1c3]/40 bg-[#8ea1c3]/10 hover:bg-[#8ea1c3]/20 hover:border-[#8ea1c3]/70"
                          : "text-[#7b8aa5] border-[#30333c] bg-transparent cursor-not-allowed"
                      }`}
                    >
                      [ PRESS START ]
                    </button>
                    <p className="pixel-text text-[6px] sm:text-[7px] text-[#8ea1c3]/25 tracking-[0.2em] coin-slot-blink">
                      {connected ? "READY • OR PRESS ENTER" : "CONNECT FIRST • OR PRESS ENTER"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════ CONTROL PANEL DECK ═══════════ */}
          <div
            className="relative bg-[#16161e] border-x-[12px] border-b-[12px] border-[#1a1a2e] border-t-2 border-t-[#333344] rounded-b-lg overflow-hidden"
            style={{ 
              transform: "perspective(1000px) rotateX(25deg)", 
              transformOrigin: "top center",
              marginTop: "-10px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
            }}
          >
            {/* Control Panel surface detail */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

            <div className="px-6 sm:px-10 py-5 sm:py-7 flex items-center justify-between">
              {/* Joystick (decorative) */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#222] border-2 border-[#444] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_0_6px_rgba(0,255,255,0.1)]" />
                <div className="w-2 h-3 bg-[#333] rounded-b-full" />
              </div>

              {/* Coin slot */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-14 sm:w-16 h-[6px] bg-[#222] border border-[#444] rounded-sm shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]" />
                <p className="pixel-text text-[6px] text-[#a18e67]/50 tracking-widest">INSERT COIN</p>
              </div>

              {/* Action buttons (decorative) */}
              <div className="flex gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1a0a2a] border-2 border-[#b573c2]/40 shadow-[0_3px_0_#220022,0_0_8px_rgba(255,0,255,0.15)]" />
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0a1a2a] border-2 border-[#8ea1c3]/40 shadow-[0_3px_0_#002222,0_0_8px_rgba(0,255,255,0.15)]" />
              </div>
            </div>

            {/* Bottom chrome */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#222] to-transparent" />
          </div>

          {/* ═══════════ FLOOR SHADOW ═══════════ */}
          <div className="mx-8 h-6 bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.06)_0%,transparent_70%)] -mt-1" />
        </div>
      </div>
    </div>
  );
}
