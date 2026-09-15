"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_COLORS = ["#6e56f8", "#a996ff", "#4429c9", "#ffffff", "#ffd166"];

const STAR_CLIP =
  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";

type Shape = "bar" | "dot" | "star";

// Weighted toward dot/star: they stay legible through a full spin, unlike a
// thin bar which goes edge-on (and near-invisible) at some rotations.
const SHAPES: Shape[] = ["star", "dot", "bar", "star", "dot"];

type Particle = {
  id: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
  rotate: number;
  delay: number;
  shape: Shape;
};

function makeParticles(count: number, colors: string[]): Particle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    angle: Math.random() * Math.PI * 2,
    distance: 90 + Math.random() * 230,
    size: 11 + Math.random() * 15,
    color: colors[id % colors.length],
    rotate: Math.random() * 720 - 360,
    delay: Math.random() * 0.25,
    shape: SHAPES[id % SHAPES.length],
  }));
}

export default function ConfettiBurst({
  count = 56,
  colors = DEFAULT_COLORS,
}: {
  count?: number;
  colors?: string[];
}) {
  const particles = useMemo(() => makeParticles(count, colors), [count, colors]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => {
        const burstX = Math.cos(particle.angle) * particle.distance;
        const burstY = Math.sin(particle.angle) * particle.distance * 0.7 - 60;

        return (
          <motion.span
            key={particle.id}
            className={cn(
              "absolute left-1/2 top-1/2",
              particle.shape === "dot" && "rounded-full",
              particle.shape === "bar" && "rounded-[2px]"
            )}
            style={{
              width: particle.size,
              height: particle.shape === "bar" ? particle.size * 0.55 : particle.size,
              backgroundColor: particle.color,
              clipPath: particle.shape === "star" ? STAR_CLIP : undefined,
              boxShadow:
                particle.shape !== "bar"
                  ? `0 0 ${particle.size * 1.8}px ${particle.color}, 0 0 ${particle.size * 3.2}px ${particle.color}`
                  : `0 0 ${particle.size}px ${particle.color}`,
            }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.7 }}
            animate={{
              x: [0, burstX, burstX * 1.2],
              y: [0, burstY, burstY + 200],
              opacity: [1, 1, 0],
              rotate: particle.rotate,
              scale: [0.7, 1.4, 1],
            }}
            transition={{
              duration: 2,
              delay: particle.delay,
              times: [0, 0.4, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        );
      })}
    </div>
  );
}
