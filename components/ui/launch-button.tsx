"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Rocket, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Phase = "idle" | "anticipation" | "ignition" | "celebration" | "settle";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Stage windows in ms, matched to the brief: anticipation (0-150), ignition (150-400),
// celebration (400-900), settle (900+) — total sequence stays under ~1.2s.
const STAGE_MS = {
  anticipation: 150,
  ignition: 250,
  celebration: 500,
  settle: 300,
} as const;

const DEFAULT_COLORS = ["#6e56f8", "#a996ff", "#4429c9", "#f4f4f7"];

type Spark = { id: number; angle: number; distance: number; size: number; delay: number };
type Trail = { id: number; angle: number; distance: number; size: number; color: string; delay: number };

function makeSparks(count: number): Spark[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    angle: (Math.PI * 2 * id) / count + (Math.random() - 0.5) * 0.3,
    distance: 26 + Math.random() * 22,
    size: 2 + Math.random() * 2,
    delay: Math.random() * 0.03,
  }));
}

function makeTrails(count: number, colors: string[]): Trail[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    angle: Math.random() * Math.PI - Math.PI, // upward hemisphere
    distance: 44 + Math.random() * 56,
    size: 3 + Math.random() * 3,
    color: colors[id % colors.length],
    delay: Math.random() * 0.12,
  }));
}

export type LaunchButtonProps = {
  label?: ReactNode;
  completedLabel?: ReactNode;
  icon?: ReactNode;
  completedIcon?: ReactNode;
  /** Palette used for the glow, shockwave, sparks and confetti trails. */
  colors?: string[];
  /** Render already in the settled/launched state, with no animation replay (e.g. restored from storage). */
  initialLaunched?: boolean;
  /** Fires the moment the sequence starts (good place to play a sound). */
  onLaunch?: () => void;
  /** Fires once the full sequence has settled. */
  onComplete?: () => void;
  className?: string;
  disabled?: boolean;
};

export default function LaunchButton({
  label = "Launch",
  completedLabel = "Launched",
  icon,
  completedIcon,
  colors = DEFAULT_COLORS,
  initialLaunched = false,
  onLaunch,
  onComplete,
  className,
  disabled = false,
}: LaunchButtonProps) {
  const [phase, setPhase] = useState<Phase>(initialLaunched ? "settle" : "idle");
  const [skipEntrance] = useState(initialLaunched);
  const prefersReducedMotion = useReducedMotion();
  const timeouts = useRef<number[]>([]);

  const sparks = useMemo(() => makeSparks(16), []);
  const trails = useMemo(() => makeTrails(22, colors), [colors]);

  useEffect(
    () => () => {
      timeouts.current.forEach((id) => window.clearTimeout(id));
    },
    []
  );

  const schedule = (fn: () => void, delay: number) => {
    timeouts.current.push(window.setTimeout(fn, delay));
  };

  const handleClick = useCallback(() => {
    if (phase !== "idle" || disabled) return;
    onLaunch?.();

    if (prefersReducedMotion) {
      setPhase("settle");
      onComplete?.();
      return;
    }

    setPhase("anticipation");
    schedule(() => setPhase("ignition"), STAGE_MS.anticipation);
    schedule(() => setPhase("celebration"), STAGE_MS.anticipation + STAGE_MS.ignition);
    schedule(() => {
      setPhase("settle");
      onComplete?.();
    }, STAGE_MS.anticipation + STAGE_MS.ignition + STAGE_MS.celebration);
  }, [phase, disabled, prefersReducedMotion, onLaunch, onComplete]);

  const isSettled = phase === "settle";
  const isBusy = phase !== "idle" && phase !== "settle";
  const glowColor = colors[0] ?? DEFAULT_COLORS[0];

  return (
    <span className="relative inline-flex">
      {/* Anticipation + ignition glow: energy charging up behind the button */}
      <AnimatePresence>
        {(phase === "anticipation" || phase === "ignition") && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-[-10px] rounded-full"
            style={{ background: glowColor, filter: "blur(16px)" }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: phase === "anticipation" ? [0.15, 0.5, 0.3] : [0.5, 0.85, 0],
              scale: phase === "anticipation" ? [0.85, 1, 0.96] : [1, 1.3, 1.6],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: (phase === "anticipation" ? STAGE_MS.anticipation : STAGE_MS.ignition) / 1000, ease: EASE_OUT }}
          />
        )}
      </AnimatePresence>

      {/* Ignition: expanding shockwave ring */}
      <AnimatePresence>
        {phase === "ignition" && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full border-2"
            style={{ borderColor: glowColor }}
            initial={{ opacity: 0.9, scale: 0.7 }}
            animate={{ opacity: 0, scale: 2.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: STAGE_MS.ignition / 1000, ease: EASE_OUT }}
          />
        )}
      </AnimatePresence>

      {/* Ignition: quick screen-safe flash */}
      <AnimatePresence>
        {phase === "ignition" && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: STAGE_MS.ignition / 1000, ease: EASE_OUT, times: [0, 0.25, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Ignition: spark burst */}
      <AnimatePresence>
        {phase === "ignition" && (
          <motion.span aria-hidden className="pointer-events-none absolute inset-0">
            {sparks.map((spark) => {
              const x = Math.cos(spark.angle) * spark.distance;
              const y = Math.sin(spark.angle) * spark.distance;
              return (
                <motion.span
                  key={spark.id}
                  className="absolute left-1/2 top-1/2 rounded-full"
                  style={{ width: spark.size, height: spark.size, background: glowColor }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x, y, opacity: 0, scale: 0.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: STAGE_MS.ignition / 1000, delay: spark.delay, ease: EASE_OUT }}
                />
              );
            })}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Celebration: confetti / light-trail particles arcing up and falling */}
      <AnimatePresence>
        {phase === "celebration" && (
          <motion.span aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
            {trails.map((trail) => {
              const riseX = Math.sin(trail.angle) * trail.distance;
              const riseY = -Math.abs(Math.cos(trail.angle)) * trail.distance - 20;
              return (
                <motion.span
                  key={trail.id}
                  className="absolute left-1/2 top-1/2 rounded-[1px]"
                  style={{ width: trail.size, height: trail.size * 2.2, background: trail.color }}
                  initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                  animate={{
                    x: [0, riseX, riseX * 1.1],
                    y: [0, riseY, riseY + 90],
                    opacity: [1, 1, 0],
                    rotate: riseX > 0 ? 180 : -180,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: STAGE_MS.celebration / 1000,
                    delay: trail.delay,
                    times: [0, 0.45, 1],
                    ease: EASE_OUT,
                  }}
                />
              );
            })}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Settle: residual glow fading out behind the success state */}
      <AnimatePresence>
        {isSettled && !skipEntrance && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-[-6px] rounded-full"
            style={{ background: glowColor, filter: "blur(14px)" }}
            initial={{ opacity: 0.6, scale: 1.1 }}
            animate={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: STAGE_MS.settle / 1000 + 0.3, ease: EASE_OUT }}
          />
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleClick}
        disabled={disabled || isBusy || isSettled}
        aria-live="polite"
        animate={{
          scale: phase === "anticipation" ? 0.95 : phase === "ignition" ? 1.1 : 1,
        }}
        transition={
          phase === "ignition"
            ? { type: "spring", stiffness: 380, damping: 9, mass: 0.6 }
            : { duration: 0.2, ease: EASE_OUT }
        }
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium",
          "transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          "disabled:cursor-default",
          isSettled
            ? "text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
            : "bg-ink text-bg hover:bg-accent hover:text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
          className
        )}
        style={isSettled ? { background: `linear-gradient(135deg, ${glowColor}, ${colors[2] ?? glowColor})` } : undefined}
      >
        <span className="relative inline-flex h-4 w-4 items-center justify-center">
          <AnimatePresence mode="wait" initial={!skipEntrance}>
            {!isSettled ? (
              <motion.span
                key="icon"
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  rotate: phase === "ignition" || phase === "celebration" ? 45 : 0,
                  y: phase === "celebration" ? -20 : 0,
                  opacity: phase === "celebration" ? 0 : 1,
                }}
                transition={{ duration: phase === "celebration" ? STAGE_MS.celebration / 1000 : 0.25, ease: EASE_OUT }}
              >
                {icon ?? <Rocket className="h-4 w-4" />}
              </motion.span>
            ) : (
              <motion.span
                key="completed-icon"
                className="absolute inset-0 flex items-center justify-center"
                initial={skipEntrance ? false : { opacity: 0, scale: 0.4, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                {completedIcon ?? <CheckCircle2 className="h-4 w-4" />}
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        <AnimatePresence mode="wait" initial={!skipEntrance}>
          <motion.span
            key={isSettled ? "completed" : "label"}
            initial={skipEntrance ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            {isSettled ? completedLabel : label}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </span>
  );
}
