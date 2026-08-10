const fs = require("fs");
const path = require("path");
const { textToPath } = require("./lib/text-to-path.cjs");

const OUT = path.join(__dirname, "../../brand/logo");
const TEXT = "Auroha Tejve";
const FONT_SIZE = 100;
const TRACKING = -0.01;
const PAD = 6;

const COLORS = {
  color: { fill: 'url(#atWordmarkGrad)' },
  black: { fill: "#000000" },
  white: { fill: "#FFFFFF" },
};

const GRADIENT_DEFS = `<linearGradient id="atWordmarkGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#4429C9" />
      <stop offset="1" stop-color="#6E56F8" />
    </linearGradient>`;

function buildWordmark(variant) {
  const { d, width, minY, maxY } = textToPath(TEXT, FONT_SIZE, 0, 0, TRACKING);
  const vbX = -PAD;
  const vbY = minY - PAD;
  const vbW = width + PAD * 2;
  const vbH = maxY - minY + PAD * 2;
  const { fill } = COLORS[variant];
  const defs = variant === "color" ? `<defs>${GRADIENT_DEFS}</defs>` : "";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" fill="none">
  <title>Auroha Tejve — wordmark</title>
  ${defs}
  <path d="${d}" fill="${fill}" />
</svg>
`;
  fs.writeFileSync(path.join(OUT, `wordmark-${variant}.svg`), svg);
  return { d, width, minY, maxY, vbX, vbY, vbW, vbH };
}

// Icon path fragments (hand-authored, viewBox 0 0 48 48) per color variant.
const ICON_PATHS = {
  color: `<defs>${GRADIENT_DEFS.replace("atWordmarkGrad", "atIconGrad")}</defs>
    <path d="M8 35L24 19L40 35" stroke="url(#atIconGrad)" stroke-width="5.6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <path d="M24 5L29 10L24 15L19 10Z" fill="#A996FF" />`,
  black: `<path d="M8 35L24 19L40 35" stroke="#000000" stroke-width="5.6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <path d="M24 5L29 10L24 15L19 10Z" fill="#000000" />`,
  white: `<path d="M8 35L24 19L40 35" stroke="#FFFFFF" stroke-width="5.6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <path d="M24 5L29 10L24 15L19 10Z" fill="#FFFFFF" />`,
};
const ICON_VB = { x: 2, y: 2, w: 44, h: 44 }; // visual bounds within the 48x48 icon viewBox

function buildLockupHorizontal(variant, wm) {
  // Icon height ~= 1.35x cap-height for optical balance next to the wordmark.
  const capHeight = 66; // at FONT_SIZE 100 (matches font's sCapHeight ratio)
  const iconH = capHeight * 1.35;
  const iconScale = iconH / ICON_VB.h;
  const iconW = ICON_VB.w * iconScale;
  const gap = 22;

  // Vertically center the icon on the cap-height band (y: -capHeight -> 0).
  const capMidY = -capHeight / 2;
  const iconTopY = capMidY - iconH / 2;

  const iconX = 0;
  const iconTranslateX = iconX - ICON_VB.x * iconScale;
  const iconTranslateY = iconTopY - ICON_VB.y * iconScale;

  const wmX = iconW + gap;

  const totalMinY = Math.min(iconTopY, wm.minY);
  const totalMaxY = Math.max(iconTopY + iconH, wm.maxY);
  const totalMinX = 0;
  const totalMaxX = wmX + wm.width;

  const vbX = totalMinX - PAD;
  const vbY = totalMinY - PAD;
  const vbW = totalMaxX - totalMinX + PAD * 2;
  const vbH = totalMaxY - totalMinY + PAD * 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" fill="none">
  <title>Auroha Tejve — horizontal lockup</title>
  <g transform="translate(${iconTranslateX} ${iconTranslateY}) scale(${iconScale})">
    ${ICON_PATHS[variant]}
  </g>
  <g transform="translate(${wmX} 0)">
    ${variant === "color" ? `<defs>${GRADIENT_DEFS}</defs>` : ""}
    <path d="${wm.d}" fill="${COLORS[variant].fill}" />
  </g>
</svg>
`;
  fs.writeFileSync(path.join(OUT, `lockup-horizontal-${variant}.svg`), svg);
}

function buildLockupStacked(variant, wm) {
  const iconH = 130;
  const iconScale = iconH / ICON_VB.h;
  const iconW = ICON_VB.w * iconScale;
  const gap = 30;

  const wmCenterX = wm.width / 2;
  const iconCenterX = iconW / 2;
  const maxCenterX = Math.max(wmCenterX, iconCenterX);

  const iconX = maxCenterX - iconCenterX;
  const iconY = 0;
  const iconTranslateX = iconX - ICON_VB.x * iconScale;
  const iconTranslateY = iconY - ICON_VB.y * iconScale;

  const wmY = iconH + gap - wm.minY;
  const wmX = maxCenterX - wmCenterX;

  const totalW = maxCenterX * 2;
  const totalTopY = iconY;
  const totalBottomY = wmY + wm.maxY;

  const vbX = -PAD;
  const vbY = totalTopY - PAD;
  const vbW = totalW + PAD * 2;
  const vbH = totalBottomY - totalTopY + PAD * 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" fill="none">
  <title>Auroha Tejve — stacked lockup</title>
  <g transform="translate(${iconTranslateX} ${iconTranslateY}) scale(${iconScale})">
    ${ICON_PATHS[variant]}
  </g>
  <g transform="translate(${wmX} ${wmY})">
    ${variant === "color" ? `<defs>${GRADIENT_DEFS}</defs>` : ""}
    <path d="${wm.d}" fill="${COLORS[variant].fill}" />
  </g>
</svg>
`;
  fs.writeFileSync(path.join(OUT, `lockup-stacked-${variant}.svg`), svg);
}

for (const variant of ["color", "black", "white"]) {
  const wm = buildWordmark(variant);
  buildLockupHorizontal(variant, wm);
  buildLockupStacked(variant, wm);
}

console.log("Wordmark + lockups generated.");
