import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-wide text-ink-muted uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}
