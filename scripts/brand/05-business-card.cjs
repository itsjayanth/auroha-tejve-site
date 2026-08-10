const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { textToPath } = require("./lib/text-to-path.cjs");

const LOGO = path.join(__dirname, "../../brand/logo");
const OUT = path.join(__dirname, "../../brand/business-card");

// US business card size at 300dpi: 3.5in x 2in
const W = 1050;
const H = 600;
const BLEED = 36; // ~0.12in bleed margin

const COLOR_BG = "#07070A";
const COLOR_ACCENT = "#6E56F8";
const COLOR_ACCENT_DEEP = "#4429C9";
const COLOR_INK = "#F4F4F7";
const COLOR_INK_MUTED = "#A2A2B3";

function readInner(svgFile) {
  const raw = fs.readFileSync(path.join(LOGO, svgFile), "utf8");
  const match = raw.match(/<svg[^>]*viewBox="([^"]+)"[^>]*>([\s\S]*)<\/svg>/);
  return { viewBox: match[1], inner: match[2].replace(/<title>.*?<\/title>/, "") };
}

async function buildFront() {
  const lockup = readInner("lockup-horizontal-white.svg");
  const [, lvbY, lvbW, lvbH] = lockup.viewBox.split(" ").map(Number);
  const lockupTargetW = 340;
  const scale = lockupTargetW / lvbW;
  const lockupX = BLEED + 20;
  const lockupY = 70 - lvbY * scale;

  const name = textToPath("[Full Name]", 30, 0, 0, -0.005, "body");
  const title = textToPath("[Job Title]", 19, 0, 0, 0, "body");
  const contact = textToPath("hello@aurohatejve.com  ·  aurohatejve.com", 17, 0, 0, 0, "body");

  const nameX = BLEED + 20;
  const nameY = H - 150 - name.minY;
  const titleX = BLEED + 20;
  const titleY = H - 112 - title.minY;
  const contactX = BLEED + 20;
  const contactY = H - 58 - contact.minY;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="cardGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(${W} 0) rotate(135) scale(${W * 0.9})">
      <stop offset="0" stop-color="${COLOR_ACCENT}" stop-opacity="0.35" />
      <stop offset="1" stop-color="${COLOR_ACCENT}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${COLOR_BG}" />
  <rect width="${W}" height="${H}" fill="url(#cardGlow)" />
  <g transform="translate(${lockupX} ${lockupY}) scale(${scale})">${lockup.inner}</g>
  <path d="${name.d}" fill="${COLOR_INK}" transform="translate(${nameX} ${nameY})" />
  <path d="${title.d}" fill="${COLOR_INK_MUTED}" transform="translate(${titleX} ${titleY})" />
  <path d="${contact.d}" fill="${COLOR_ACCENT === "#6E56F8" ? "#A996FF" : COLOR_INK_MUTED}" transform="translate(${contactX} ${contactY})" />
  <rect x="${BLEED + 20}" y="${H - 190}" width="40" height="3" fill="${COLOR_ACCENT}" />
</svg>`;

  fs.writeFileSync(path.join(OUT, "business-card-front.svg"), svg);
  await sharp(Buffer.from(svg), { density: 384 }).resize(W, H).png().toFile(path.join(OUT, "business-card-front.png"));
}

async function buildBack() {
  const mark = readInner("icon-mark-white.svg");
  const [, mvbY, mvbW, mvbH] = mark.viewBox.split(" ").map(Number);
  const targetH = 220;
  const scale = targetH / mvbH;
  const markW = mvbW * scale;
  const markX = (W - markW) / 2;
  const markY = (H - targetH) / 2 - mvbY * scale;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="cardBackBg" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${COLOR_ACCENT}" />
      <stop offset="1" stop-color="${COLOR_ACCENT_DEEP}" />
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#cardBackBg)" />
  <g transform="translate(${markX} ${markY}) scale(${scale})">${mark.inner}</g>
</svg>`;

  fs.writeFileSync(path.join(OUT, "business-card-back.svg"), svg);
  await sharp(Buffer.from(svg), { density: 384 }).resize(W, H).png().toFile(path.join(OUT, "business-card-back.png"));
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  await buildFront();
  await buildBack();
  console.log("Business card mockups generated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
