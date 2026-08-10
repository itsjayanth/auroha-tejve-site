import { Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import ContactForm from "@/components/contact-form";

const details = [
  { icon: Mail, label: "Email", value: siteConfig.email },
  { icon: MapPin, label: "Location", value: siteConfig.location },
  { icon: Clock, label: "Response time", value: "Within 1 business day" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Contact"
              title="Start the conversation."
              description="Whether it's a Shopify app, a full storefront, or a SaaS product from scratch — tell us where you're headed."
            />

            <Reveal delay={0.15}>
              <ul className="mt-10 space-y-5">
                {details.map((item) => (
                  <li key={item.label} className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-white/[0.03] text-accent-soft">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-ink-faint">{item.label}</p>
                      <p className="mt-0.5 text-sm text-ink">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={0.05}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
