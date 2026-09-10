import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
  onClick?: () => void;
};

export default function Button({ href, children, variant = "primary", className, external, onClick }: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

  const variants = {
    primary:
      "bg-ink text-bg hover:bg-accent hover:text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
    secondary:
      "border border-border-strong text-ink hover:border-accent-soft/60 hover:text-accent-soft bg-white/[0.02]",
  };

  if (!href) {
    return (
      <button type="button" onClick={onClick} className={cn(base, variants[variant], className)}>
        {children}
      </button>
    );
  }

  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}
