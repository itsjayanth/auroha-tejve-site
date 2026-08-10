"use client";

import { motion } from "framer-motion";
import { Blocks, Sparkles, Store, Layers } from "lucide-react";
import { services, type Service } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const icons: Record<Service["icon"], React.ComponentType<{ className?: string }>> = {
  "shopify-app": Blocks,
  "shopify-store": Store,
  saas: Layers,
  ai: Sparkles,
};

export default function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What we do"
          title="Four capabilities. One senior team."
          description="We don't hand you off to a bench of juniors. Every engagement is run by the people who'll actually build it."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <RevealItem key={service.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="card-surface group relative h-full overflow-hidden rounded-2xl p-8"
                >
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(circle, var(--color-accent-dim), transparent 70%)" }}
                  />

                  <div className="relative flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border-strong bg-white/[0.03] text-accent-soft transition-colors duration-300 group-hover:border-accent-soft/40 group-hover:text-accent-soft">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-display text-xs text-ink-faint">0{index + 1}</span>
                  </div>

                  <h3 className="relative mt-6 text-xl font-medium text-ink">{service.title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-ink-muted">{service.description}</p>

                  <ul className="relative mt-6 flex flex-wrap gap-2">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-full border border-border bg-white/[0.02] px-3 py-1 text-xs text-ink-muted"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
