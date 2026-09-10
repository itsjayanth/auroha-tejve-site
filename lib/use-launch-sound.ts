"use client";

import { useCallback, useRef } from "react";

type ChimeShape = "rise" | "fanfare";

export function useLaunchSound(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new AudioCtx();
    }
    return ctxRef.current;
  }, []);

  return useCallback(
    (shape: ChimeShape = "rise") => {
      if (!enabled || typeof window === "undefined") return;

      const ctx = getContext();
      if (ctx.state === "suspended") ctx.resume();

      const notes = shape === "fanfare" ? [523.25, 659.25, 783.99, 1046.5] : [440, 554.37, 659.25];
      const start = ctx.currentTime;
      const step = 0.09;

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;

        const noteStart = start + i * step;
        gain.gain.setValueAtTime(0, noteStart);
        gain.gain.linearRampToValueAtTime(0.12, noteStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.5);

        osc.connect(gain).connect(ctx.destination);
        osc.start(noteStart);
        osc.stop(noteStart + 0.55);
      });
    },
    [enabled, getContext]
  );
}
