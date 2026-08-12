"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";
import GradientMesh from "@/components/ui/gradient-mesh";
import { siteConfig } from "@/lib/data";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-3xl border border-border-strong bg-bg-elevated px-6 py-20 text-center sm:px-16">
          <GradientMesh />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-2xl"
          >
            <h2 className="text-balance font-display text-3xl font-medium leading-tight text-ink sm:text-5xl">
              Let&rsquo;s build something worth shipping.
            </h2>
            <p className="mt-5 text-balance text-lg leading-relaxed text-ink-muted">
              Tell us about your product, your store, or your idea. We&rsquo;ll reply within one business day.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="#contact">
                Start a Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button href={`mailto:${siteConfig.email}`} variant="secondary">
                Email us directly
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
