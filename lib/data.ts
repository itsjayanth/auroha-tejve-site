export const siteConfig = {
  name: "Auroha Tejve Private Limited",
  shortName: "Auroha Tejve",
  tagline: "We build the software behind modern commerce.",
  description:
    "A software studio building Shopify apps, Shopify stores, B2B SaaS products, and AI solutions.",
  email: "hello@aurohatejve.com",
  location: "Remote-first · Building from India",
};

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Approach", href: "#approach" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks = [
  { label: "X / Twitter", href: "https://twitter.com/aurohatejve" },
  { label: "LinkedIn", href: "https://linkedin.com/company/aurohatejve" },
  { label: "GitHub", href: "https://github.com/aurohatejve" },
];

export type Service = {
  title: string;
  description: string;
  points: string[];
  icon: "shopify-app" | "shopify-store" | "saas" | "ai";
};

export const services: Service[] = [
  {
    title: "Shopify App Development",
    description:
      "Public and private Shopify apps built for the App Store — from first prototype to a listing that converts merchants into subscribers.",
    points: ["App Store submissions", "Billing & subscriptions", "Embedded admin UI"],
    icon: "shopify-app",
  },
  {
    title: "Shopify Store Development",
    description:
      "Custom, high-converting storefronts on Shopify and Shopify Plus — themes engineered for speed, and merchandising that sells.",
    points: ["Custom theme builds", "Headless storefronts", "CRO & performance"],
    icon: "shopify-store",
  },
  {
    title: "B2B SaaS Development",
    description:
      "End-to-end product builds for B2B software companies — architecture, design systems, and infrastructure that scale with you.",
    points: ["Product architecture", "Multi-tenant infra", "Design systems"],
    icon: "saas",
  },
  {
    title: "AI Solutions",
    description:
      "Applied AI and automation for commerce and business workflows — from LLM-powered features to full pipeline automation.",
    points: ["LLM-powered features", "Workflow automation", "Data & retrieval pipelines"],
    icon: "ai",
  },
];

export type Product = {
  name: string;
  status: "Now Building" | "In Development";
  tagline: string;
  description: string;
  features: string[];
  frame: "browser" | "phone";
  href: string;
};

export const products: Product[] = [
  {
    name: "Ordzo",
    status: "In Development",
    tagline: "AI-based order management for ecommerce",
    description:
      "Ordzo helps merchants automate and streamline order processing with AI — triaging, routing, and resolving orders before they ever become a support ticket.",
    features: [
      "AI-powered order triage & prioritization",
      "Automated fulfillment routing",
      "Real-time exception detection",
      "Unified, multi-channel order dashboard",
    ],
    frame: "browser",
    href: "https://ordzo.vercel.app/",
  },
  {
    name: "OrderFlow",
    status: "Now Building",
    tagline: "WhatsApp-based order taking & management",
    description:
      "OrderFlow turns WhatsApp into a full ordering platform — letting businesses take, confirm, and manage orders without asking customers to leave the chat.",
    features: [
      "Catalog & ordering inside WhatsApp",
      "Automated order confirmations",
      "Real-time status broadcasts",
      "Shared team inbox for order management",
    ],
    frame: "phone",
    href: "https://orderflow-sandbox.vercel.app/",
  },
];

export type Pillar = {
  title: string;
  description: string;
  icon: "speed" | "craft" | "ai-native" | "reliability";
};

export const pillars: Pillar[] = [
  {
    title: "Speed without shortcuts",
    description:
      "Small, senior teams move fast because they don't have layers to move through — not because they cut corners.",
    icon: "speed",
  },
  {
    title: "Obsessive craftsmanship",
    description:
      "Pixel-level care and clean architecture, applied equally to the parts users see and the parts they never will.",
    icon: "craft",
  },
  {
    title: "AI-native thinking",
    description:
      "We don't bolt AI onto finished products — we design workflows assuming it from the first sketch.",
    icon: "ai-native",
  },
  {
    title: "Built for reliability",
    description:
      "Tested, monitored, and documented systems — software that holds up quietly, long after launch day.",
    icon: "reliability",
  },
];

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "We dig into your business, users, and constraints to define what actually needs to be built.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Wireframes and product architecture come together into a system that's intuitive and built to scale.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Senior engineers ship in tight, visible iterations — you see working software every week, not every quarter.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "A deliberate, tested rollout — performance, edge cases, and monitoring in place before go-live.",
  },
  {
    step: "05",
    title: "Support",
    description:
      "We stay close after launch, iterating on real usage data and keeping the system healthy long-term.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Auroha Tejve rebuilt our checkout flow in weeks and conversion jumped almost overnight. They think like founders, not vendors.",
    name: "Placeholder Name",
    role: "Placeholder Title, Placeholder Company",
  },
  {
    quote:
      "The team shipped our SaaS MVP faster than any agency we'd worked with, and the codebase was clean enough that our in-house team took over without friction.",
    name: "Placeholder Name",
    role: "Placeholder Title, Placeholder Company",
  },
  {
    quote:
      "What stood out was how they treated AI — not as a gimmick, but as core product infrastructure from day one.",
    name: "Placeholder Name",
    role: "Placeholder Title, Placeholder Company",
  },
];
