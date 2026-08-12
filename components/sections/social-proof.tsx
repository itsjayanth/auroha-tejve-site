"use client";

import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export default function SocialProof() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients say"
          align="center"
          className="mx-auto max-w-2xl"
        />

        <RevealGroup className="mx-auto mt-16 grid max-w-xl grid-cols-1 gap-5">
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
      </div>
    </section>
  );
}
