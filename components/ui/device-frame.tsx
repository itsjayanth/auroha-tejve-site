import type { ReactNode } from "react";

export function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border-strong bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <div className="ml-3 h-5 flex-1 max-w-64 rounded-md bg-white/[0.04]" />
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[280px] rounded-[2.5rem] border border-border-strong bg-surface p-2.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
      <div className="relative overflow-hidden rounded-[2rem] bg-surface-2">
        <div className="absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/60" />
        <div className="min-h-[420px] pt-10">{children}</div>
      </div>
    </div>
  );
}
