"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { InputState, useGameLoop } from "@/src/hooks/use-game-input";

const KEY_LAYOUT: Array<{
  id: keyof InputState;
  label: string;
  subLabel: string;
  hint: string;
}> = [
  { id: "up", label: "W", subLabel: "UP", hint: "Advance" },
  { id: "left", label: "A", subLabel: "LEFT", hint: "Strafe" },
  { id: "down", label: "S", subLabel: "DOWN", hint: "Retreat" },
  { id: "right", label: "D", subLabel: "RIGHT", hint: "Circle" },
];

const HOW_TO_PLAY = [
  "Clear the vault room by punishing each spawn before it lands a hit.",
  "Loot the glowing relic fragments to keep health and power surging.",
  "Spacebar gives a lobbed shock that bounces off walls, hit it often.",
  "Pull back when the vault spikes flash, then rip another charge.",
];

const HINTS = [
  "Tip: keep your back to the wall so you can dodge every wave.",
  "Pro tip: chaining hits increases your relic drop chance.",
  "Reminder: spacebar is your crowd control, spam between slides.",
];

export interface ArcadeCabinetScreenProps {
  onStart: () => void;
  onCancel?: () => void;
}

export function ArcadeCabinetScreen({ onStart, onCancel }: ArcadeCabinetScreenProps) {
  const [keyStates, setKeyStates] = useState<Record<string, boolean>>({
    up: false,
    down: false,
    left: false,
    right: false,
    action: false,
  });
  const keyStateRef = useRef<Record<string, boolean>>(keyStates);
  const [flash, setFlash] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const previousInput = useRef<InputState | null>(null);
  const isStarting = useRef(false);

  const startSequence = useCallback(() => {
    if (isStarting.current) return;
    isStarting.current = true;
    setFlash(true);
    window.setTimeout(() => {
      setFlash(false);
      onStart();
      isStarting.current = false;
    }, 460);
  }, [onStart]);

  const loopCallback = useCallback(
    (input: InputState) => {
      const pressed = {
        up: input.up,
        down: input.down,
        left: input.left,
        right: input.right,
        action: input.action,
      };

      const changed =
        KEY_LAYOUT.some((entry) => keyStateRef.current[entry.id] !== pressed[entry.id]) ||
        keyStateRef.current.action !== pressed.action;
      if (changed) {
        keyStateRef.current = pressed;
        setKeyStates(pressed);
      }

      if (!previousInput.current?.enter && input.enter) {
        startSequence();
      }

      previousInput.current = input;
    },
    [startSequence],
  );

  useGameLoop(loopCallback);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHintIndex((prev) => (prev + 1) % HINTS.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, []);

  const pressedSpace = keyStates.action;

  const keyNodes = useMemo(
    () =>
      KEY_LAYOUT.map((entry) => (
        <div
          key={entry.label}
          className={`group relative flex flex-col items-center justify-center gap-1 rounded-2xl border px-3 py-4 text-center text-[10px] uppercase tracking-[0.3em] transition-transform duration-150 ${
            keyStates[entry.id] ? "bg-emerald-400/80 text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.8)] scale-105" : "bg-slate-900/60 text-slate-200 border-white/10"
          }`}
        >
          <span className="text-lg font-bold drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">{entry.label}</span>
          <span className="text-[8px] text-slate-400">{entry.subLabel}</span>
          <span className="text-[8px] text-slate-500">{entry.hint}</span>
        </div>
      )),
    [keyStates],
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-6">
      <div className="relative w-full max-w-5xl">
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-3">
            <div
              className={`arcade-cabinet relative overflow-hidden rounded-[2.4rem] border border-white/20 bg-gradient-to-br from-slate-900 via-slate-950 to-zinc-900 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.9)] ${
                flash ? "screen-flash" : ""
              }`}
            >
              <div
                className="arcade-screen relative overflow-hidden rounded-[1.5rem] border border-white/20 bg-[#010409] p-4"
                style={{ boxShadow: "0 0 45px rgba(8, 17, 28, 0.8), inset 0 0 40px rgba(255,255,255,0.05)" }}
              >
                <div
                  className={`relative flex min-h-[260px] flex-col gap-6 rounded-[1.2rem] border border-white/5 bg-[#031022]/80 p-5 backdrop-blur`}
                >
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.4em] text-slate-400">
                    <span>HOW TO PLAY</span>
                    <span>{HINTS[hintIndex]}</span>
                  </div>
                  <ul className="space-y-2 text-[13px] leading-relaxed text-slate-200">
                    {HOW_TO_PLAY.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <span className="mt-1 block h-1 w-1 rounded-full bg-emerald-400" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.3em] text-slate-400">
                    <div>
                      Controls: WASD / Spacebar
                    </div>
                    <div className="flex gap-2">
                      <span className="rounded-full border border-white/20 px-3 py-1">Press Start</span>
                      <button
                        type="button"
                        onClick={() => onCancel?.()}
                        className="rounded-full border border-rose-400/50 bg-rose-400/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-rose-100"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="arcade-visor mt-3 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="h-2 w-16 rounded-full bg-gradient-to-r from-emerald-400 via-slate-200 to-emerald-400" />
                  <p className="text-[9px] uppercase tracking-[0.4em] text-slate-300">Arcade Core</p>
                </div>
                <div className="flex gap-2">
                  <span className="h-4 w-4 rounded-full border border-white/20 bg-slate-800" />
                  <span className="h-4 w-4 rounded-full border border-white/20 bg-slate-800" />
                </div>
              </div>
              <div className="arcade-body mt-4 grid gap-3 sm:grid-cols-[1fr_1fr]">
                <div className="space-y-2 rounded-2xl border border-white/5 bg-black/40 p-4 shadow-inner">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-slate-400">Controls</p>
                  <div className="grid grid-cols-2 gap-2">{keyNodes}</div>
                </div>
                <div className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-black/40 p-4 shadow-inner">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-5 text-center">
                    <div className={`mx-auto mb-2 h-12 w-full rounded-2xl border border-white/10 bg-gradient-to-br ${pressedSpace ? "from-emerald-400/90 to-white/80" : "from-slate-900/30 to-slate-800/60"}`}>
                      <div className="flex h-full items-center justify-center text-[11px] font-bold uppercase tracking-[0.4em] text-slate-200">
                        Space
                      </div>
                    </div>
                    <p className="text-[9px] uppercase tracking-[0.4em] text-slate-400">Attack</p>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">Live Input</p>
                  <div className="text-[13px] text-slate-200">
                    Press WASD + Space to preview each action. The fade/scale on each key tracks your exact input.
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400">Coin slot</span>
                </div>
                <button
                  type="button"
                  onClick={startSequence}
                  className="rounded-full border border-white/30 bg-white/10 px-6 py-2 text-[12px] font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/20"
                >
                  Press Start
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Future extension: hooking a gamepad simply requires mapping its buttons to this InputState
// and invoking the same update pipeline above so the render state stays in sync.
