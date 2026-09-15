"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Wraps a logo/icon mark in a soft, breathing glow halo — the lingering
 * "premium" ambiance behind the live-state marks, not just the launch burst.
 */
export default function GlowMark({
  children,
  color,
  size = "9rem",
  className,
}: {
  children: ReactNode;
  color: string;
  size?: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, rgba(${color},0.5) 0%, transparent 70%)`,
          filter: "blur(28px)",
        }}
      />
      {!prefersReducedMotion ? (
        <motion.div
          aria-hidden
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle, rgba(${color},0.4) 0%, transparent 70%)`,
            filter: "blur(28px)",
          }}
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}
