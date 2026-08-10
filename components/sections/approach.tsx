"use client";

import { Gauge, Gem, BrainCog, ShieldCheck } from "lucide-react";
import { pillars, type Pillar } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const icons: Record<Pillar["icon"], React.ComponentType<{ className?: string }>> = {
  speed: Gauge,
  craft: Gem,
  "ai-native": BrainCog,
  reliability: ShieldCheck,
};

export default function Approach() {
  return (
    <section id="approach" className="relative py-28 sm:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why us"
          title="An approach built for people who care how it's built."
          description="Four principles that shape every engagement, from a two-week prototype to a year-long product build."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = icons[pillar.icon];
            return (
              <RevealItem key={pillar.title} className="group relative bg-bg-elevated p-8 transition-colors duration-300 hover:bg-surface">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-strong bg-white/[0.03] text-accent-soft">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-ink">{pillar.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{pillar.description}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
