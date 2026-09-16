"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PartyPopper, ChevronDown } from "lucide-react";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import LogoMark from "@/components/ui/logo-mark";
import GradientMesh from "@/components/ui/gradient-mesh";
import ConfettiBurst from "@/components/ui/confetti-burst";
import { launch, siteConfig } from "@/lib/data";

type Phase = "idle" | "celebrating" | "live";

const dateLabel = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
}).format(new Date(`${launch.date}T00:00:00`));

export default function ActOneAuroha({
  initialLive,
  onLive,
  playSound,
  announce,
  onContinue,
}: {
  initialLive: boolean;
  onLive: () => void;
  playSound: () => void;
  announce: (text: string) => void;
  onContinue: () => void;
}) {
  const [phase, setPhase] = useState<Phase>(initialLive ? "live" : "idle");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (initialLive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with the persisted-launch prop, restored asynchronously by the parent
      setPhase("live");
    }
  }, [initialLive]);

  const goLive = () => {
    announce(`${launch.companyName} is now live.`);
    playSound();

    if (prefersReducedMotion) {
      setPhase("live");
      onLive();
      return;
    }

    setPhase("celebrating");
    window.setTimeout(() => {
      setPhase("live");
      onLive();
    }, 2600);
  };

  const isLive = phase === "live";

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:px-16">
      <GradientMesh dense tint="indigo" />

      <AnimatePresence>
        {phase === "celebrating" ? (
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "radial-gradient(circle at 50% 45%, rgba(110,86,248,0.5), transparent 60%)" }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.7, 1.5, 1.9] }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : null}
      </AnimatePresence>

      {phase === "celebrating" ? <ConfettiBurst count={70} /> : null}

      <div className="relative mx-auto max-w-2xl">
        <AnimatePresence mode="wait">
          {!isLive ? (
            <motion.div
              key="idle"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <Badge>
                <span className="h-1.5 w-1.5 rounded-full bg-accent-soft animate-pulse" />
                Act One &middot; Inauguration
              </Badge>
              <LogoMark className="mt-8 h-16 w-16 sm:h-20 sm:w-20" />
              <h1 className="mt-8 whitespace-nowrap font-display text-[clamp(0.75rem,4.4vw,4.5rem)] font-medium leading-[1.05] text-gradient">
                Inaugurating {launch.companyName}
              </h1>
              <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-muted sm:text-xl">
                {siteConfig.tagline}
              </p>
              <div className="mt-10">
                <Button onClick={goLive}>
                  <PartyPopper className="h-4 w-4" />
                  Go Live
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="live"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <LogoMark className="h-16 w-16 sm:h-20 sm:w-20" />
              <h1 className="mt-8 whitespace-nowrap font-display text-[clamp(0.85rem,4vw,4.5rem)] font-medium leading-[1.05] text-gradient">
                {launch.companyName} is Live 🎉
              </h1>
              <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-muted sm:text-xl">
                Officially inaugurated &middot; {dateLabel}
              </p>

              <motion.button
                type="button"
                onClick={onContinue}
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 1.2 }}
                className="mt-14 inline-flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-sm text-ink-faint transition-colors hover:text-ink-muted focus-visible:text-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Continue to Flenn
                <ChevronDown className="h-4 w-4 animate-bounce" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
