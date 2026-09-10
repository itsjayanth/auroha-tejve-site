"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TINTS = {
  indigo: { primary: "110,86,248", secondary: "169,150,255", tertiary: "68,41,201" },
  green: { primary: "37,211,102", secondary: "6,163,124", tertiary: "7,94,84" },
};

export default function GradientMesh({
  className,
  dense = false,
  tint = "indigo",
}: {
  className?: string;
  dense?: boolean;
  tint?: keyof typeof TINTS;
}) {
  const colors = TINTS[tint];

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)",
        }}
      />

      <motion.div
        className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-[60%] rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(${colors.primary},0.55) 0%, rgba(${colors.primary},0.12) 45%, transparent 70%)`,
          filter: "blur(40px)",
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-10 right-0 h-[28rem] w-[28rem] translate-x-1/3 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(${colors.secondary},0.4) 0%, rgba(${colors.secondary},0.08) 45%, transparent 70%)`,
          filter: "blur(50px)",
        }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {dense ? (
        <motion.div
          className="absolute bottom-0 left-0 h-[24rem] w-[24rem] -translate-x-1/4 translate-y-1/4 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${colors.tertiary},0.45) 0%, rgba(${colors.tertiary},0.08) 45%, transparent 70%)`,
            filter: "blur(45px)",
          }}
          animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, transparent 0%, var(--color-bg) 96%)",
        }}
      />
    </div>
  );
}
