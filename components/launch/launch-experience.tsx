"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import ActOneAuroha from "./act-one-auroha";
import ActTwoOrderFlow from "./act-two-orderflow";
import { launchPageConfig } from "@/lib/data";
import { useLaunchSound } from "@/lib/use-launch-sound";

const STORAGE_KEYS = {
  act1: "auroha-launch:act1",
  act2: "auroha-launch:act2",
};

export default function LaunchExperience() {
  const [act1Live, setAct1Live] = useState(false);
  const [act2Live, setAct2Live] = useState(false);
  const [muted, setMuted] = useState(true);
  const [announcement, setAnnouncement] = useState("");

  const act2Ref = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  const playChime = useLaunchSound(launchPageConfig.soundEnabled && !muted);

  useEffect(() => {
    if (!launchPageConfig.lockAfterFirstClick) return;

    if (window.localStorage.getItem(STORAGE_KEYS.act1) === "live") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring persisted launch state, not React state
      setAct1Live(true);
    }
    if (window.localStorage.getItem(STORAGE_KEYS.act2) === "live") {
      setAct2Live(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToAct2 = () => {
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
    act2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAct1Live = () => {
    setAct1Live(true);
    if (launchPageConfig.lockAfterFirstClick) {
      window.localStorage.setItem(STORAGE_KEYS.act1, "live");
    }
    scrollTimeoutRef.current = window.setTimeout(scrollToAct2, 2400);
  };

  const handleAct2Live = () => {
    setAct2Live(true);
    if (launchPageConfig.lockAfterFirstClick) {
      window.localStorage.setItem(STORAGE_KEYS.act2, "live");
    }
  };

  return (
    <div>
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      {launchPageConfig.soundEnabled ? (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute celebration sound" : "Mute celebration sound"}
          className="fixed right-5 top-24 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-bg-elevated/80 text-ink-muted backdrop-blur transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      ) : null}

      <ActOneAuroha
        initialLive={act1Live}
        onLive={handleAct1Live}
        onContinue={scrollToAct2}
        playSound={() => playChime("rise")}
        announce={setAnnouncement}
      />

      {act1Live ? (
        <div ref={act2Ref}>
          <ActTwoOrderFlow
            initialLive={act2Live}
            onLive={handleAct2Live}
            playSound={() => playChime("fanfare")}
            announce={setAnnouncement}
          />
        </div>
      ) : null}
    </div>
  );
}
