"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { products } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import Badge from "@/components/ui/badge";
import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frame";
import { cn } from "@/lib/utils";

function OrdzoMockup() {
  const rows = [
    { label: "Order #4821", state: "Auto-fulfilled", pct: 92 },
    { label: "Order #4820", state: "AI triaged", pct: 68 },
    { label: "Order #4819", state: "Needs review", pct: 34 },
    { label: "Order #4818", state: "Auto-fulfilled", pct: 88 },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {["Orders today", "AI-resolved", "Avg. time"].map((label, i) => (
          <div key={label} className="rounded-lg border border-border bg-white/[0.02] p-3">
            <p className="text-[10px] uppercase tracking-wide text-ink-faint">{label}</p>
            <p className="mt-1.5 font-display text-lg text-ink">
              {i === 0 ? "1,204" : i === 1 ? "94%" : "8s"}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-2.5">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 rounded-lg border border-border bg-white/[0.015] px-3.5 py-2.5"
          >
            <div>
              <p className="text-xs font-medium text-ink">{row.label}</p>
              <p className="text-[11px] text-ink-faint">{row.state}</p>
            </div>
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent-soft"
                style={{ width: `${row.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderFlowMockup() {
  const bubbles = [
    { from: "customer", text: "Hi! I'd like to order 2x Classic Combo" },
    { from: "biz", text: "Got it 🙌 Confirming: 2x Classic Combo — ₹580 total" },
    { from: "customer", text: "Yes please" },
    { from: "biz", text: "Order confirmed ✅ Preparing now — ETA 25 min" },
  ];

  return (
    <div className="flex h-full flex-col justify-end gap-2.5 bg-[#0b141a] px-3 pb-4">
      {bubbles.map((bubble, i) => (
        <div
          key={i}
          className={cn(
            "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[11.5px] leading-snug shadow-sm",
            bubble.from === "biz"
              ? "self-end rounded-br-sm bg-[#005c4b] text-white/95"
              : "self-start rounded-bl-sm bg-[#1f2c34] text-white/85"
          )}
        >
          {bubble.text}
        </div>
      ))}
    </div>
  );
}

export default function Products() {
  return (
    <section id="products" className="relative py-28 sm:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our products"
          title="Software we're building for ourselves — and the market."
          description="Alongside client work, we're building our own products. Two are live in active development right now."
        />

        <div className="mt-20 space-y-24">
          {products.map((product, index) => {
            const reversed = index % 2 === 1;

            return (
              <Reveal key={product.name}>
                <div
                  className={cn(
                    "grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16",
                    reversed && "lg:[&>*:first-child]:order-2"
                  )}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={cn(
                          product.status === "Now Building"
                            ? "border-accent-soft/30 bg-accent-dim text-accent-soft"
                            : ""
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            product.status === "Now Building" ? "bg-accent-soft animate-pulse" : "bg-ink-faint"
                          )}
                        />
                        {product.status}
                      </Badge>
                    </div>

                    <h3 className="mt-5 font-display text-3xl font-medium text-ink sm:text-4xl">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-base font-medium text-accent-soft">{product.tagline}</p>
                    <p className="mt-4 text-balance leading-relaxed text-ink-muted">{product.description}</p>

                    <ul className="mt-7 space-y-3">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-ink">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-accent-soft">
                            <Check className="h-3 w-3" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent-soft"
                    >
                      Visit site
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {product.frame === "browser" ? (
                      <BrowserFrame>
                        <OrdzoMockup />
                      </BrowserFrame>
                    ) : (
                      <PhoneFrame>
                        <OrderFlowMockup />
                      </PhoneFrame>
                    )}
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
