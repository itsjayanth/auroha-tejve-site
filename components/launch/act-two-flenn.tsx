"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Rocket, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import GradientMesh from "@/components/ui/gradient-mesh";
import ConfettiBurst from "@/components/ui/confetti-burst";
import FireworksBurst from "@/components/ui/fireworks-burst";
import Starfield from "@/components/ui/starfield";
import GlowMark from "@/components/ui/glow-mark";
import { launch, products } from "@/lib/data";

type Phase = "idle" | "celebrating" | "live";

const GREEN_GLOW = "37,211,102";
const GREEN_PALETTE = ["#25d366", "#8cf5b0", "#075e54", "#ffffff", "#ffd166"];
const FIREWORK_COLORS = ["#ffffff", "#8cf5b0", "#25d366", "#ffd166"];

const flenn = products.find((product) => product.name === launch.appName);

function FlennMark({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        background: "linear-gradient(135deg, #25D366 0%, #075E54 100%)",
      }}
    >
      <MessageCircle className="h-1/2 w-1/2 text-white" strokeWidth={2.25} />
    </div>
  );
}

export default function ActTwoFlenn({
  initialLive,
  onLive,
  playSound,
  announce,
}: {
  initialLive: boolean;
  onLive: () => void;
  playSound: () => void;
  announce: (text: string) => void;
}) {
  const [phase, setPhase] = useState<Phase>(initialLive ? "live" : "idle");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (initialLive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with the persisted-launch prop, restored asynchronously by the parent
      setPhase("live");
    }
  }, [initialLive]);

  const launchApp = () => {
    announce(`${launch.appName} is now live.`);
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
    }, 3600);
  };

  const isLive = phase === "live";

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:px-16">
      <GradientMesh dense tint="green" />

      <AnimatePresence>
        {phase === "celebrating" ? (
          <>
            <motion.div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 50% 45%, rgba(37,211,102,0.5), transparent 60%)",
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: [0, 0.9, 0], scale: [0.7, 1.5, 1.9] }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 50% 45%, rgba(140,245,176,0.4), transparent 65%)",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.75, 0], scale: [0.5, 2, 2.7] }}
              transition={{ duration: 1.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          </>
        ) : null}
      </AnimatePresence>

      {phase === "celebrating" ? (
        <>
          <Starfield count={40} variant="burst" color="255,255,255" />
          <FireworksBurst count={5} colors={FIREWORK_COLORS} />
          <ConfettiBurst count={170} colors={GREEN_PALETTE} />
        </>
      ) : null}

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
              <Badge className="border-[#25d366]/30 bg-[#25d366]/10 text-[#8cf5b0]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25d366] animate-pulse" />
                Act Two &middot; Product Launch
              </Badge>
              <GlowMark color={GREEN_GLOW} size="7rem" className="mt-8">
                <FlennMark className="flex h-16 w-16 items-center justify-center rounded-2xl sm:h-20 sm:w-20" />
              </GlowMark>
              <h1 className="mt-8 text-balance font-display text-4xl font-medium leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
                {launch.appName}
              </h1>
              <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-muted sm:text-xl">
                {flenn?.tagline}. Not live yet — but not for long.
              </p>
              <div className="mt-10">
                <Button onClick={launchApp}>
                  <Rocket className="h-4 w-4" />
                  Launch {launch.appName}
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
              <Starfield count={18} variant="ambient" color="140,245,176" />
              <GlowMark color={GREEN_GLOW} size="8rem">
                <FlennMark className="flex h-16 w-16 items-center justify-center rounded-2xl sm:h-20 sm:w-20" />
              </GlowMark>
              <motion.h1
                className="mt-8 text-balance font-display text-4xl font-medium leading-[1.05] text-ink sm:text-6xl lg:text-7xl"
                style={
                  prefersReducedMotion
                    ? { filter: "drop-shadow(0 0 20px rgba(37,211,102,0.4))" }
                    : undefined
                }
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        filter: [
                          "drop-shadow(0 0 16px rgba(37,211,102,0.3))",
                          "drop-shadow(0 0 38px rgba(37,211,102,0.6))",
                          "drop-shadow(0 0 16px rgba(37,211,102,0.3))",
                        ],
                      }
                }
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {launch.appName} is Now Live 🚀
              </motion.h1>
              <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-muted sm:text-xl">
                {flenn?.description}
              </p>
              <div className="mt-10">
                <Button href={launch.appUrl} external>
                  Go to {launch.appName}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
