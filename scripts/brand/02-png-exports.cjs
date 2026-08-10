const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const LOGO = path.join(__dirname, "../../brand/logo");
const PNG = path.join(__dirname, "../../brand/png");

const ICON_SIZES = [16, 32, 48, 64, 128, 256, 512, 1024];
const LOCKUP_WIDTHS = [400, 800, 1600, 2400];

async function renderTransparent(svgPath, outPath, size, opts = {}) {
  const { width = size, height = size } = opts;
  await sharp(svgPath, { density: 384 })
    .resize(width, height, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(outPath);
}

async function main() {
  fs.mkdirSync(path.join(PNG, "icon"), { recursive: true });
  fs.mkdirSync(path.join(PNG, "app-icon"), { recursive: true });
  fs.mkdirSync(path.join(PNG, "lockup-horizontal"), { recursive: true });
  fs.mkdirSync(path.join(PNG, "lockup-stacked"), { recursive: true });

  // Standalone icon mark — transparent background, color / black / white.
  for (const variant of ["color", "black", "white", "mono-indigo"]) {
    for (const size of ICON_SIZES) {
      await renderTransparent(
        path.join(LOGO, `icon-mark-${variant}.svg`),
        path.join(PNG, "icon", `icon-mark-${variant}-${size}.png`),
        size
      );
    }
  }

  // App icon / badge — solid background (color, black, white), for platforms
  // that composite icons onto their own mask (no transparency needed/wanted).
  for (const variant of ["color", "black", "white"]) {
    for (const size of ICON_SIZES) {
      const svg = fs.readFileSync(path.join(LOGO, `icon-badge-${variant}.svg`), "utf8");
      await sharp(Buffer.from(svg), { density: 384 })
        .resize(size, size)
        .png()
        .toFile(path.join(PNG, "app-icon", `icon-badge-${variant}-${size}.png`));
    }
  }

  // Horizontal + stacked lockups — transparent background, multiple widths.
  for (const variant of ["color", "black", "white"]) {
    for (const kind of ["horizontal", "stacked"]) {
      const svgPath = path.join(LOGO, `lockup-${kind}-${variant}.svg`);
      const meta = await sharp(svgPath).metadata();
      const aspect = meta.height / meta.width;
      for (const width of LOCKUP_WIDTHS) {
        const height = Math.round(width * aspect);
        await renderTransparent(
          svgPath,
          path.join(PNG, `lockup-${kind}`, `lockup-${kind}-${variant}-${width}.png`),
          width,
          { width, height }
        );
      }
    }
  }

  console.log("PNG exports generated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
