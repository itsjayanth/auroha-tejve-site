"use client";

import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export default function SocialProof() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-3">
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
