"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Star = {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
};

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: 3 + Math.random() * 4,
    delay: Math.random() * 2.2,
    duration: 1.4 + Math.random() * 1.8,
  }));
}

/**
 * variant "burst": stars flash in once and fade — for the celebration moment.
 * variant "ambient": a slow, low-opacity infinite twinkle — for a lingering
 * premium glow behind already-live content.
 */
export default function Starfield({
  count = 32,
  color = "255,255,255",
  variant = "ambient",
}: {
  count?: number;
  color?: string;
  variant?: "ambient" | "burst";
}) {
  const stars = useMemo(() => makeStars(count), [count]);
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  const isBurst = variant === "burst";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: `rgba(${color},1)`,
            boxShadow: `0 0 ${star.size * 3}px rgba(${color},0.9), 0 0 ${star.size * 6}px rgba(${color},0.4)`,
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            isBurst
              ? { opacity: [0, 1, 1, 0], scale: [0.4, 1.3, 1, 0.5] }
              : { opacity: [0.12, 0.85, 0.12], scale: [0.8, 1.15, 0.8] }
          }
          transition={
            isBurst
              ? { duration: star.duration, delay: star.delay, ease: [0.16, 1, 0.3, 1] }
              : {
                  duration: star.duration * 1.8,
                  delay: star.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}
