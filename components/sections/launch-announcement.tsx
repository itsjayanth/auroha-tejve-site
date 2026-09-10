"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import GradientMesh from "@/components/ui/gradient-mesh";
import ConfettiBurst from "@/components/ui/confetti-burst";
import { launch } from "@/lib/data";

type LaunchState = "idle" | "celebrating" | "settled";

const launchDateLabel = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
}).format(new Date(`${launch.date}T00:00:00`));

export default function LaunchAnnouncement() {
  const [state, setState] = useState<LaunchState>("idle");
  const [announcement, setAnnouncement] = useState("");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (Date.now() >= new Date(`${launch.date}T00:00:00`).getTime()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with the real-world clock, not React state
      setState("settled");
    }
  }, []);

  const goLive = () => {
    setAnnouncement(
      `${launch.companyName} is now live. And we're launching our first product — ${launch.appName}.`
    );

    if (prefersReducedMotion) {
      setState("settled");
      return;
    }

    setState("celebrating");
    window.setTimeout(() => setState("settled"), 1500);
  };

  const isLive = state === "celebrating" || state === "settled";

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-3xl border border-border-strong bg-bg-elevated px-6 py-20 text-center sm:px-16">
          <GradientMesh />
          {state === "celebrating" ? <ConfettiBurst /> : null}

          <div aria-live="polite" className="sr-only">
            {announcement}
          </div>

          <div className="relative mx-auto max-w-2xl">
            <AnimatePresence mode="wait">
              {!isLive ? (
                <motion.div
                  key="idle"
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Badge>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-soft animate-pulse" />
                    Launch Day
                  </Badge>
                  <h2 className="mt-6 text-balance font-display text-3xl font-medium leading-tight text-ink sm:text-5xl">
                    Something big is about to go live.
                  </h2>
                  <p className="mt-5 text-balance text-lg leading-relaxed text-ink-muted">
                    We&rsquo;re inaugurating {launch.companyName} and launching our first product,{" "}
                    {launch.appName}.
                  </p>
                  <div className="mt-9 flex justify-center">
                    <Button onClick={goLive}>
                      <PartyPopper className="h-4 w-4" />
                      Go Live
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="live"
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="text-balance font-display text-3xl font-medium leading-tight text-ink sm:text-5xl">
                    {launch.companyName} is now live 🎉
                  </h2>
                  <p className="mt-5 text-balance text-lg leading-relaxed text-ink-muted">
                    And we&rsquo;re launching our first product — {launch.appName}.
                  </p>
                  <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button href={launch.appUrl} external>
                      Explore {launch.appName}
                    </Button>
                  </div>

                  <AnimatePresence>
                    {state === "settled" ? (
                      <motion.div
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.2 }}
                        className="mt-8 flex justify-center"
                      >
                        <Badge>
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" />
                          Launched {launchDateLabel}
                        </Badge>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
