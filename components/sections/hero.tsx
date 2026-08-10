"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/button";
import GradientMesh from "@/components/ui/gradient-mesh";

const capabilities = ["Shopify Apps", "Shopify Stores", "B2B SaaS", "AI Solutions"];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-20 pb-28 sm:pt-28 sm:pb-36">
      <GradientMesh dense />

      <div className="container-px relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" />
            Auroha Tejve Private Limited
          </span>

          <h1 className="mt-8 text-balance font-display text-4xl font-medium leading-[1.05] text-gradient sm:text-6xl lg:text-7xl">
            We build the software behind modern commerce.
          </h1>

          <p className="mt-7 max-w-2xl text-balance text-lg leading-relaxed text-ink-muted sm:text-xl">
            A software studio crafting Shopify apps, high-converting Shopify stores,
            B2B SaaS products, and applied AI solutions — for teams who refuse to
            ship anything ordinary.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button href="#contact" className="w-full sm:w-auto">
              Book a Call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button href="#products" variant="secondary" className="w-full sm:w-auto">
              See our products
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-20 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {capabilities.map((item) => (
            <span key={item} className="flex items-center gap-2 text-sm text-ink-faint">
              <span className="h-1 w-1 rounded-full bg-ink-faint" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
