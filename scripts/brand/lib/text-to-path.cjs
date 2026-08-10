const opentype = require("opentype.js");
const fs = require("fs");
const path = require("path");

const FONTS = {
  display: path.join(
    __dirname,
    "../../../node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-600-normal.woff"
  ),
  body: path.join(__dirname, "../../../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff"),
};

const cache = {};
function loadFont(family = "display") {
  if (cache[family]) return cache[family];
  const buf = fs.readFileSync(FONTS[family]);
  cache[family] = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
  return cache[family];
}

/**
 * Converts a text string to SVG path data using real glyph outlines
 * (bypasses opentype.js's GSUB-based shaping, which errors on these fonts'
 * ligature tables — fine here since none of our strings use ligature pairs).
 */
function textToPath(text, fontSize, x0 = 0, y0 = 0, trackingEm = 0, family = "display") {
  const font = loadFont(family);
  const scale = fontSize / font.unitsPerEm;
  let x = x0;
  const pathsD = [];
  let minY = Infinity;
  let maxY = -Infinity;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const glyph = font.charToGlyph(ch);
    if (ch !== " ") {
      const p = glyph.getPath(x, y0, fontSize);
      pathsD.push(p.toPathData(2));
      const bbox = p.getBoundingBox();
      if (bbox.y1 < minY) minY = bbox.y1;
      if (bbox.y2 > maxY) maxY = bbox.y2;
    }
    let advance = glyph.advanceWidth * scale;
    if (i < text.length - 1) {
      const kerning = font.getKerningValue(glyph, font.charToGlyph(text[i + 1]));
      advance += kerning * scale;
    }
    advance += trackingEm * fontSize;
    x += advance;
  }

  return {
    d: pathsD.join(" "),
    width: x - x0,
    minY: Number.isFinite(minY) ? minY : y0,
    maxY: Number.isFinite(maxY) ? maxY : y0,
  };
}

module.exports = { textToPath, loadFont };
