const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { textToPath } = require("./lib/text-to-path.cjs");

const LOGO = path.join(__dirname, "../../brand/logo");
const OUT = path.join(__dirname, "../../brand/social");

const COLOR_BG = "#07070A";
const COLOR_ACCENT = "#6E56F8";
const COLOR_ACCENT_SOFT = "#A996FF";
const COLOR_ACCENT_DEEP = "#4429C9";
const COLOR_INK = "#F4F4F7";
const COLOR_INK_MUTED = "#A2A2B3";

function readInner(svgFile) {
  const raw = fs.readFileSync(path.join(LOGO, svgFile), "utf8");
  const match = raw.match(/<svg[^>]*viewBox="([^"]+)"[^>]*>([\s\S]*)<\/svg>/);
  return { viewBox: match[1], inner: match[2].replace(/<title>.*?<\/title>/, "") };
}

async function buildProfilePicture() {
  const size = 1080;
  const { inner, viewBox } = readInner("icon-app-square-color.svg");
  const [, , vbW, vbH] = viewBox.split(" ").map(Number);
  const scale = size / vbW;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <g transform="scale(${scale})">${inner}</g>
</svg>`;

  await sharp(Buffer.from(svg), { density: 384 })
    .resize(size, size)
    .png()
    .toFile(path.join(OUT, "profile-picture-1080.png"));
}

async function buildCoverBanner() {
  const width = 1500;
  const height = 500;

  // Horizontal lockup (white variant) sized + positioned within the banner.
  const lockup = readInner("lockup-horizontal-white.svg");
  const [lvbX, lvbY, lvbW, lvbH] = lockup.viewBox.split(" ").map(Number);
  const lockupTargetW = 560;
  const lockupScale = lockupTargetW / lvbW;
  const lockupTargetH = lvbH * lockupScale;

  const tagline = textToPath("Software behind modern commerce.", 34, 0, 0, -0.005, "body");

  const contentBlockH = lockupTargetH + 28 + (tagline.maxY - tagline.minY);
  const startY = (height - contentBlockH) / 2;
  const lockupX = 110;
  const lockupY = startY - lvbY * lockupScale;
  const taglineX = 112;
  const taglineY = startY + lockupTargetH + 40 - tagline.minY;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <radialGradient id="bannerGlow1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(420 60) rotate(90) scale(420 620)">
      <stop offset="0" stop-color="${COLOR_ACCENT}" stop-opacity="0.55" />
      <stop offset="1" stop-color="${COLOR_ACCENT}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="bannerGlow2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1280 440) rotate(90) scale(320 460)">
      <stop offset="0" stop-color="${COLOR_ACCENT_SOFT}" stop-opacity="0.4" />
      <stop offset="1" stop-color="${COLOR_ACCENT_SOFT}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="taglineFill" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${COLOR_INK_MUTED}" />
      <stop offset="1" stop-color="${COLOR_INK_MUTED}" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="${COLOR_BG}" />
  <rect width="${width}" height="${height}" fill="url(#bannerGlow1)" />
  <rect width="${width}" height="${height}" fill="url(#bannerGlow2)" />
  <g transform="translate(${lockupX} ${lockupY}) scale(${lockupScale})">${lockup.inner}</g>
  <g transform="translate(${taglineX} ${taglineY})">
    <path d="${tagline.d}" fill="${COLOR_INK_MUTED}" />
  </g>
</svg>`;

  fs.writeFileSync(path.join(OUT, "cover-banner-1500x500.svg"), svg);
  await sharp(Buffer.from(svg), { density: 384 })
    .resize(width, height)
    .png()
    .toFile(path.join(OUT, "cover-banner-1500x500.png"));

  // LinkedIn-specific size (1584x396) — same composition, re-flowed.
  const liWidth = 1584;
  const liHeight = 396;
  const liStartY = (liHeight - contentBlockH) / 2;
  const liLockupY = liStartY - lvbY * lockupScale;
  const liTaglineY = liStartY + lockupTargetH + 40 - tagline.minY;
  const liSvg = svg
    .replace(`width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"`, `width="${liWidth}" height="${liHeight}" viewBox="0 0 ${liWidth} ${liHeight}"`)
    .replace(`width="${width}" height="${height}" fill="${COLOR_BG}"`, `width="${liWidth}" height="${liHeight}" fill="${COLOR_BG}"`)
    .replace(`width="${width}" height="${height}" fill="url(#bannerGlow1)"`, `width="${liWidth}" height="${liHeight}" fill="url(#bannerGlow1)"`)
    .replace(`width="${width}" height="${height}" fill="url(#bannerGlow2)"`, `width="${liWidth}" height="${liHeight}" fill="url(#bannerGlow2)"`)
    .replace(`translate(${lockupX} ${lockupY}) scale(${lockupScale})`, `translate(${lockupX} ${liLockupY}) scale(${lockupScale})`)
    .replace(`translate(${taglineX} ${taglineY})`, `translate(${taglineX} ${liTaglineY})`);

  fs.writeFileSync(path.join(OUT, "cover-banner-linkedin-1584x396.svg"), liSvg);
  await sharp(Buffer.from(liSvg), { density: 384 })
    .resize(liWidth, liHeight)
    .png()
    .toFile(path.join(OUT, "cover-banner-linkedin-1584x396.png"));
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  await buildProfilePicture();
  await buildCoverBanner();
  console.log("Social assets generated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
