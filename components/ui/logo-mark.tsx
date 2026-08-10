import { cn } from "@/lib/utils";

/**
 * The Auroha Tejve icon mark: an ascending chevron with a diamond "spark"
 * above it. Source of truth lives in /brand/logo/icon-badge-color.svg —
 * keep this in sync if the mark's geometry changes there.
 */
export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={cn("h-8 w-8", className)} aria-hidden="true">
      <defs>
        <linearGradient id="logoMarkBg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6E56F8" />
          <stop offset="1" stopColor="#4429C9" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#logoMarkBg)" />
      <path
        d="M10.5 46L32 24L53.5 46"
        stroke="#FFFFFF"
        strokeWidth={7.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M32 8.5L38 14.5L32 20.5L26 14.5Z" fill="#FFFFFF" />
    </svg>
  );
}
