# Auroha Tejve — Marketing Site

Marketing website for Auroha Tejve Private Limited, a software studio building
Shopify apps, Shopify stores, B2B SaaS products, and AI solutions.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion for scroll-triggered animations and micro-interactions
- lucide-react for icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project structure

- `app/` — routes, root layout, SEO metadata, the contact API route (`app/api/contact`)
- `components/sections/` — one component per homepage section (Hero, Services, Products, Approach, Process, Social Proof, CTA, Contact)
- `components/layout/` — Navbar and Footer
- `components/ui/` — reusable primitives (Button, Badge, SectionHeading, Reveal, GradientMesh, DeviceFrame, Noise)
- `lib/data.ts` — all site copy/content (services, products, process steps, testimonials, nav links)

## Editing content

Nearly all copy — services, the Ordzo/OrderFlow product cards, process steps,
pillars, and testimonials — lives in `lib/data.ts`. Update it there rather than
in the section components.

## Contact form

`POST /api/contact` validates the submission and currently logs it server-side.
Wire up real email delivery (e.g. Resend, Postmark) or a CRM webhook in
`app/api/contact/route.ts` when ready.

## Build

```bash
npm run build
npm start
```
