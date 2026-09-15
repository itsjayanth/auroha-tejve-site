# Auroha Tejve — Marketing Site

Marketing website for Auroha Tejve Private Limited, a software studio building
Shopify apps, Shopify stores, B2B SaaS products, and AI solutions.

## Preview

| Hero | Products |
| --- | --- |
| ![Hero section](docs/screenshots/desktop-hero.png) | ![Products section](docs/screenshots/desktop-products.png) |

| Full desktop page | Full mobile page |
| --- | --- |
| ![Full desktop page](docs/screenshots/desktop-full.png) | <img src="docs/screenshots/mobile-full.png" alt="Full mobile page" width="280" /> |

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
- `components/ui/` — reusable primitives (Button, Badge, SectionHeading, Reveal, GradientMesh, DeviceFrame, Noise, LogoMark)
- `lib/data.ts` — all site copy/content (services, products, process steps, testimonials, nav links)
- `brand/` — logo source files (SVG), PNG/favicon/app-icon exports, and social/email/business-card assets, with a full usage guide at `brand/README.md`
- `scripts/brand/` — the generator scripts that produce everything in `brand/` and the site's favicons, in case the logo ever needs to change

## Editing content

Nearly all copy — services, the Ordzo/Flenn product cards, process steps,
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
