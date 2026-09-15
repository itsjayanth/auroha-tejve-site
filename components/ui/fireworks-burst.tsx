"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Firework = {
  id: number;
  x: number;
  y: number;
  delay: number;
  color: string;
  rays: number;
  radius: number;
};

function makeFireworks(count: number, colors: string[]): Firework[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: 16 + Math.random() * 68,
    y: 6 + Math.random() * 48,
    delay: id * 0.34 + Math.random() * 0.15,
    color: colors[id % colors.length],
    rays: 14 + Math.floor(Math.random() * 6),
    radius: 100 + Math.random() * 80,
  }));
}

function Burst({ firework }: { firework: Firework }) {
  const angles = useMemo(
    () => Array.from({ length: firework.rays }, (_, i) => (360 / firework.rays) * i),
    [firework.rays]
  );

  return (
    <div className="absolute" style={{ left: `${firework.x}%`, top: `${firework.y}%` }}>
      <motion.span
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 20,
          height: 20,
          backgroundColor: firework.color,
          boxShadow: `0 0 32px ${firework.color}, 0 0 64px ${firework.color}, 0 0 100px ${firework.color}`,
        }}
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 3.2, 2.1], opacity: [0, 1, 0] }}
        transition={{ duration: 0.95, delay: firework.delay, ease: [0.16, 1, 0.3, 1] }}
      />
      {angles.map((angle) => (
        <motion.span
          key={angle}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 6,
            height: 6,
            backgroundColor: firework.color,
            boxShadow: `0 0 10px ${firework.color}, 0 0 20px ${firework.color}`,
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 1.2 }}
          animate={{
            x: Math.cos((angle * Math.PI) / 180) * firework.radius,
            y: Math.sin((angle * Math.PI) / 180) * firework.radius * 0.85 + 18,
            opacity: [0, 1, 1, 0],
            scale: [1.2, 1, 0.4],
          }}
          transition={{ duration: 1.3, delay: firework.delay + 0.04, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

export default function FireworksBurst({
  count = 5,
  colors = ["#ffffff", "#a996ff", "#6e56f8"],
}: {
  count?: number;
  colors?: string[];
}) {
  const prefersReducedMotion = useReducedMotion();
  const fireworks = useMemo(() => makeFireworks(count, colors), [count, colors]);

  if (prefersReducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {fireworks.map((fw) => (
        <Burst key={fw.id} firework={fw} />
      ))}
    </div>
  );
}
