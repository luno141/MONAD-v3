"use client";

import { useEffect, useRef, useCallback } from "react";

export type InputState = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  action: boolean;
  enter: boolean;
};

export function useGameLoop(callback: (input: InputState, delta: number) => void) {
  const inputRef = useRef<InputState>({
    up: false,
    down: false,
    left: false,
    right: false,
    action: false,
    enter: false,
  });

  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.code) {
      case "KeyW":
      case "ArrowUp":
        inputRef.current.up = true;
        break;
      case "KeyS":
      case "ArrowDown":
        inputRef.current.down = true;
        break;
      case "KeyA":
      case "ArrowLeft":
        inputRef.current.left = true;
        break;
      case "KeyD":
      case "ArrowRight":
        inputRef.current.right = true;
        break;
      case "Space":
        inputRef.current.action = true;
        break;
      case "Enter":
        inputRef.current.enter = true;
        break;
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    switch (e.code) {
      case "KeyW":
      case "ArrowUp":
        inputRef.current.up = false;
        break;
      case "KeyS":
      case "ArrowDown":
        inputRef.current.down = false;
        break;
      case "KeyA":
      case "ArrowLeft":
        inputRef.current.left = false;
        break;
      case "KeyD":
      case "ArrowRight":
        inputRef.current.right = false;
        break;
      case "Space":
        inputRef.current.action = false;
        break;
      case "Enter":
        inputRef.current.enter = false;
        break;
    }
  }, []);

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const delta = time - previousTimeRef.current;
      callback(inputRef.current, delta);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate, handleKeyDown, handleKeyUp]);
}
