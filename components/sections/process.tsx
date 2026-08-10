"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";

export default function Process() {
  return (
    <section id="process" className="relative py-28 sm:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Process"
          title="Five stages. Zero surprises."
          description="A clear, predictable path from first conversation to a system you can rely on."
        />

        <div className="relative mt-20">
          <div className="hidden lg:block">
            <div className="relative grid grid-cols-5 gap-6">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
                className="absolute left-0 right-0 top-5 h-px bg-gradient-to-r from-accent-deep via-accent-soft to-transparent"
              />

              {processSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pt-14"
                >
                  <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-bg font-display text-sm text-accent-soft">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-8 lg:hidden">
            {processSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex gap-5 pl-1"
              >
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong bg-bg font-display text-sm text-accent-soft">
                    {item.step}
                  </span>
                  {index !== processSteps.length - 1 ? (
                    <span className="mt-2 w-px flex-1 bg-border-strong" />
                  ) : null}
                </div>
                <div className="pb-2">
                  <h3 className="text-lg font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
