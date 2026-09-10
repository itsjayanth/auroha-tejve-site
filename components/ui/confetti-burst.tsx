"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const DEFAULT_COLORS = ["#6e56f8", "#a996ff", "#4429c9", "#f4f4f7"];

type Particle = {
  id: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
  rotate: number;
  delay: number;
};

function makeParticles(count: number, colors: string[]): Particle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    angle: Math.random() * Math.PI * 2,
    distance: 110 + Math.random() * 170,
    size: 7 + Math.random() * 7,
    color: colors[id % colors.length],
    rotate: Math.random() * 540 - 270,
    delay: Math.random() * 0.15,
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
            className="absolute left-1/2 top-1/2 rounded-[2px]"
            style={{
              width: particle.size,
              height: particle.size * 0.55,
              backgroundColor: particle.color,
            }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
            animate={{
              x: [0, burstX, burstX * 1.15],
              y: [0, burstY, burstY + 160],
              opacity: [1, 1, 0],
              rotate: particle.rotate,
              scale: 1,
            }}
            transition={{
              duration: 1.4,
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
