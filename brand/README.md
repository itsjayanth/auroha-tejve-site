# Auroha Tejve — Brand & Logo Guide

This folder is the source of truth for the Auroha Tejve logo and brand
assets. Everything here is generated from hand-authored vector source files
under `logo/` — see [Regenerating assets](#regenerating-assets) if you need
to tweak the design itself.

## The mark

The icon is an ascending chevron with a diamond "spark" above it, separated
by a deliberate gap.

- **The chevron** reads as a path rising to a peak — momentum, ascent,
  growth. It's the "Auroha" half of the name (from *aroha*, an ascending
  musical scale).
- **The diamond** is a distinct spark/facet sitting above the peak — never
  touching it — standing in for intelligence, precision, and brilliance.
  It's the "Tejve" half of the name (from *tej*, radiance).

Together: a studio building the software that helps modern commerce
businesses climb, with AI/precision as the thing lighting the way. The mark
is built entirely from straight lines and one diamond — no gradients or
effects baked into the geometry itself — so it stays legible from a 16px
favicon up to a banner, and won't date the way trend-driven effects do.

## Color palette

One hue family, three weights, plus black and white for flexibility.

| Swatch | Name | Use | HEX | RGB |
| --- | --- | --- | --- | --- |
| 🟪 | Indigo (primary) | Primary brand color, CTAs, mid-tone of the gradient | `#6E56F8` | `110, 86, 248` |
| 🟣 | Indigo Deep | Gradient shade, dark-context accents | `#4429C9` | `68, 41, 201` |
| 🔷 | Indigo Soft | The spark/diamond highlight, tints, light accents | `#A996FF` | `169, 150, 255` |
| ⬛ | Ink / Black | Single-color mark on light backgrounds, print | `#000000` | `0, 0, 0` |
| ⬜ | White | Single-color mark on dark or colored backgrounds | `#FFFFFF` | `255, 255, 255` |
| ⬛ | Background (site) | Near-black app/site background | `#07070A` | `7, 7, 10` |

The full-color mark uses a diagonal gradient from Indigo Deep → Indigo across
the chevron, with the diamond in Indigo Soft. Use the **single-color**
(solid Indigo, solid black, or solid white) versions anywhere a gradient
won't reproduce well: print, embroidery, watermarks, or small sizes.

## Typography

- **Display / wordmark:** [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque), SemiBold (600). Used for the wordmark and all headlines on the site. Distinctive without being trend-driven — a grotesque with just enough character in the `a`, `j`, and `e` to be recognizable at a glance.
- **Body / supporting text:** [Inter](https://fonts.google.com/specimen/Inter), Medium (500). Used for taglines, contact details, and UI text — chosen for readability at small sizes.

Both are open-source Google Fonts, so they're free to install anywhere the
brand needs to be reproduced (business cards, decks, third-party tools).

## Logo files

All source vectors live in `logo/`. Every SVG is pure geometry / real glyph
outlines — no external font dependency, so they render identically in any
tool.

| File | What it is | When to use it |
| --- | --- | --- |
| `icon-mark-color.svg` / `-black.svg` / `-white.svg` / `-mono-indigo.svg` | The mark alone, no container | App UI, favicons rendered by the browser, anywhere you need just the symbol |
| `icon-badge-color.svg` / `-black.svg` / `-white.svg` | Mark inside a rounded-square badge | App icons, avatars, contexts that expect a contained icon |
| `icon-app-square-color.svg` | Full-bleed square (no rounded corners baked in) | iOS/Android/PWA app icons — the OS applies its own corner mask |
| `wordmark-color.svg` / `-black.svg` / `-white.svg` | "Auroha Tejve" text only | Where the icon is redundant (e.g. next to an existing icon) or space is wide but short |
| `lockup-horizontal-color.svg` / `-black.svg` / `-white.svg` | Icon + wordmark, side by side | **Primary logo.** Website header, letterhead, banners |
| `lockup-stacked-color.svg` / `-black.svg` / `-white.svg` | Icon above wordmark, centered | Square/tall contexts — social profile bios, posters |

Rendered exports (PNG, transparent background, sizes 16–1024px) are under
`png/`, organized to mirror the same set: `png/icon/`, `png/app-icon/`,
`png/lockup-horizontal/`, `png/lockup-stacked/`.

## Minimum size

- **Icon mark alone:** 16px (digital) / 0.2in (print). This is what the
  design was tuned for — check `png/icon/icon-mark-color-16.png`.
- **Horizontal lockup:** 120px wide (digital) / 1in wide (print). Below
  this, switch to the icon mark alone rather than shrinking the wordmark.

## Clear space

Keep clear space around the logo (on all sides) at least equal to the
**height of the diamond spark** in the mark at that size. Nothing else —
text, edges, other logos — should intrude inside that margin.

## Do

- Use the full-color gradient version by default on both light and dark
  surfaces — it's designed to hold up on both.
- Use the single-color (black or white) version when reproducing on a
  single-color surface, in print, or at very small sizes where a gradient
  won't render cleanly.
- Keep the icon and diamond spark's gap intact — it's what keeps the mark
  from reading as a face/figure instead of a chevron-and-spark.

## Don't

- Don't recolor the mark outside the defined palette.
- Don't close the gap between the diamond and the chevron's peak.
- Don't stretch or skew the lockups — scale proportionally only.
- Don't place the color version on a busy photo background without a
  solid or scrim behind it; use a single-color version instead.
- Don't add drop shadows, bevels, or outlines — the mark is intentionally flat.

## Applying the logo

- **Website:** `lockup-horizontal-color.svg` in the header nav (small),
  `icon-badge-color.svg` as the favicon/`icon.svg`, `lockup-horizontal-*`
  in the footer. Already wired up in `public/` and `components/layout/`.
- **Favicon / browser tab:** `public/favicon.ico` (16/32/48 multi-res),
  `public/icon.svg`.
- **App icon (iOS/Android/PWA):** `public/apple-touch-icon.png` (180px),
  `public/icon-192.png`, `public/icon-512.png` — all full-bleed, no
  transparency, ready for OS-level masking.
- **Social profile picture:** `social/profile-picture-1080.png` — safe
  inside a circular crop (checked against Twitter/LinkedIn/Instagram's
  circular avatar mask).
- **Social cover / banner:** `social/cover-banner-1500x500.png` (generic /
  X) and `social/cover-banner-linkedin-1584x396.png` (LinkedIn).
- **Email signature:** `email-signature/signature-template.html` — a
  table-based HTML snippet, plus `signature-icon-128.png`. Host the PNG at
  a public URL before pasting the signature into your mail client (see
  comments in the HTML file).
- **Business card:** `business-card/business-card-front.svg` /
  `-back.svg` (and PNG renders) — a 3.5in × 2in (300dpi) template with
  placeholder name/title fields to fill in per person.

## Regenerating assets

Everything in this folder (except this guide) is generated by the scripts
in `/scripts/brand/`. If you need to tweak the geometry, colors, or copy:

1. Edit the hand-authored source SVGs in `logo/icon-*.svg`, or the constants
   at the top of the generator scripts.
2. Reinstall the one-off tooling used to build fonts-to-paths and rasterize
   (not kept as project dependencies, to keep the site's `node_modules`
   lean):
   ```bash
   npm install -D opentype.js @fontsource/bricolage-grotesque @fontsource/inter png-to-ico sharp --no-save
   ```
3. Run the scripts in order:
   ```bash
   node scripts/brand/01-wordmark-and-lockups.cjs
   node scripts/brand/02-png-exports.cjs
   node scripts/brand/03-favicons.cjs
   node scripts/brand/04-social.cjs
   node scripts/brand/05-business-card.cjs
   ```
