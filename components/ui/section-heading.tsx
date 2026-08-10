import type { ReactNode } from "react";
import Reveal from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Reveal>
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
            {eyebrow}
          </span>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2 className="text-balance text-3xl font-medium leading-[1.1] text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p className="mt-5 text-balance text-lg leading-relaxed text-ink-muted">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
