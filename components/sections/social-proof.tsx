"use client";

import { Quote } from "lucide-react";
import { testimonials, trustLogos } from "@/lib/data";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import Reveal from "@/components/ui/reveal";

export default function SocialProof() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-faint">
            Placeholder — trusted by teams like
          </p>
        </Reveal>

        <div className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
          <div className="flex w-max animate-marquee gap-16">
            {[...trustLogos, ...trustLogos].map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="font-display text-xl font-medium tracking-tight text-ink-faint/70 whitespace-nowrap"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>

        <RevealGroup className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <RevealItem key={testimonial.name + testimonial.quote}>
              <div className="card-surface flex h-full flex-col rounded-2xl p-7">
                <Quote className="h-5 w-5 text-accent-soft/70" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-sm font-medium text-ink">{testimonial.name}</p>
                  <p className="text-xs text-ink-faint">{testimonial.role}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-6 text-center text-xs text-ink-faint">
          Placeholder testimonials — replace with real client quotes.
        </p>
      </div>
    </section>
  );
}
