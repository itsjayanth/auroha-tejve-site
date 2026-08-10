const sharp = require("sharp");
const { imagesToIco } = require("png-to-ico");
const fs = require("fs");
const path = require("path");

const LOGO = path.join(__dirname, "../../brand/logo");
const OUT = path.join(__dirname, "../../public");

async function main() {
  const badgeSvg = path.join(LOGO, "icon-badge-color.svg");
  const appSquareSvg = path.join(LOGO, "icon-app-square-color.svg");

  // Multi-resolution favicon.ico — png-to-ico wants raw {width,height,data} RGBA images.
  const icoSizes = [16, 32, 48];
  const icoImages = [];
  for (const size of icoSizes) {
    const data = await sharp(badgeSvg, { density: 384 })
      .resize(size, size)
      .ensureAlpha()
      .raw()
      .toBuffer();
    icoImages.push({ width: size, height: size, data });
  }
  const ico = await imagesToIco(icoImages);
  fs.writeFileSync(path.join(OUT, "favicon.ico"), ico);

  // Standalone favicon PNGs (some browsers/pinned tabs prefer PNG directly)
  await sharp(badgeSvg, { density: 384 }).resize(32, 32).png().toFile(path.join(OUT, "favicon-32x32.png"));
  await sharp(badgeSvg, { density: 384 }).resize(16, 16).png().toFile(path.join(OUT, "favicon-16x16.png"));

  // Apple touch icon — full-bleed square; iOS applies its own corner mask.
  await sharp(appSquareSvg, { density: 384 }).resize(180, 180).png().toFile(path.join(OUT, "apple-touch-icon.png"));

  // Android / PWA manifest icons — same full-bleed square, OS applies its own mask shape.
  await sharp(appSquareSvg, { density: 384 }).resize(192, 192).png().toFile(path.join(OUT, "icon-192.png"));
  await sharp(appSquareSvg, { density: 384 }).resize(512, 512).png().toFile(path.join(OUT, "icon-512.png"));

  // Replace the site's inline SVG icon with the finalized mark badge.
  fs.copyFileSync(badgeSvg, path.join(OUT, "icon.svg"));

  console.log("Favicons + app icons generated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
