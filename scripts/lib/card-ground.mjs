/**
 * The shared ground the dojo's video cards are built on: palette, weave,
 * background, and the geometry a card needs to survive a slow push-in.
 *
 * Cards are composed on a 1920 x 1080 grid and rendered at SCALE (1.25 by
 * default), i.e. 2400 x 1350. Drop one on a 1080p timeline, where it lands at
 * 80%, and animate anywhere between 80% and 100%: every frame comes off real
 * pixels, so nothing softens, and the ground never runs out at the edges.
 *
 * Zoom-safe area: the part of the grid still on screen at 100% - the middle
 * 1536 x 864 at the default scale - less a little padding. Everything
 * readable belongs inside it, so a push-in never crops the type.
 *
 * Used by scripts/generate-opening-card.mjs and
 * scripts/generate-segue-card.mjs.
 */
import { join } from "node:path";
import sharp from "sharp";
import { SERIF, SANS } from "./brand-fonts.mjs";

export const GRID_W = 1920;
export const GRID_H = 1080;
export const DEFAULT_SCALE = 1.25;

export const INK = "#171717";
export const RED = "#B21E2B";
export const RICE = "247, 243, 235";

const PAD = 40; // breathing room inside the zoom-safe area
const DISCIPLINES = "AIKIDO · JUDO · AIKIJUJUTSU · KARATE";
const TAGLINE = "Traditional Arts. Timeless Discipline.";

export const logoPath = (root) =>
  join(root, "public", "logos", "Weatherford_Martial_Arts.png");

/** SVG text is not markup-escaped by sharp; do it here. */
export function esc(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function slug(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Reads `--key value` pairs for the keys present in `defaults`. */
export function parseArgs(argv, defaults) {
  const args = { ...defaults };
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i].replace(/^--/, "");
    if (key in args) {
      args[key] = argv[i + 1] ?? "";
      i += 1;
    }
  }
  return args;
}

/**
 * Vertical cards (YouTube Shorts) use a 1080 x 1920 grid. The glow and the
 * vignette are re-proportioned for the tall frame rather than stretched.
 */
export const VERTICAL = { w: 1080, h: 1920 };

/** Diagonal weave, same texture as the site hero and the channel banner. */
function weave(gw = GRID_W, gh = GRID_H) {
  const lines = [];
  for (let x = -gh; x < gw + gh; x += 32) {
    lines.push(`<line x1="${x}" y1="${gh}" x2="${x + gh}" y2="0"/>`);
  }
  return `<g stroke="rgba(${RICE}, 0.035)" stroke-width="2">${lines.join("")}</g>`;
}

/**
 * The ground is drawn on the grid and rasterized at the output size, so the
 * glow and the vignette keep their proportions at any scale. Both are
 * stretched well past the frame: a push-in crops into them, and a gradient
 * that ended at the edge would show its rim as soon as it did.
 */
export function backgroundSvg(outW, outH, vertical = false) {
  const gw = vertical ? VERTICAL.w : GRID_W;
  const gh = vertical ? VERTICAL.h : GRID_H;
  // Glow and vignette ellipses (radius x, radius y), tuned per orientation.
  const glow = vertical ? { cy: gh * 0.44, rx: 900, ry: 1080 } : { cy: gh * 0.46, rx: 1060, ry: 730 };
  const vig = vertical ? { rx: 1000, ry: 1500 } : { rx: 1390, ry: 890 };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${outW}" height="${outH}" viewBox="0 0 ${gw} ${gh}">
  <defs>
    <radialGradient id="glow" gradientUnits="userSpaceOnUse"
      cx="${gw / 2}" cy="${glow.cy}" r="${glow.rx}"
      gradientTransform="translate(0, ${glow.cy * (1 - glow.ry / glow.rx)}) scale(1, ${glow.ry / glow.rx})">
      <stop offset="0" stop-color="${RED}" stop-opacity="0.34"/>
      <stop offset="0.55" stop-color="${RED}" stop-opacity="0.11"/>
      <stop offset="1" stop-color="${RED}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" gradientUnits="userSpaceOnUse"
      cx="${gw / 2}" cy="${gh / 2}" r="${vig.rx}"
      gradientTransform="translate(0, ${(gh / 2) * (1 - vig.ry / vig.rx)}) scale(1, ${vig.ry / vig.rx})">
      <stop offset="0.40" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.62"/>
    </radialGradient>
  </defs>

  <rect width="${gw}" height="${gh}" fill="${INK}"/>
  ${weave(gw, gh)}
  <rect width="${gw}" height="${gh}" fill="url(#glow)"/>

  <rect width="${gw}" height="${gh}" fill="url(#vignette)"/>
</svg>`;
}

/**
 * A card's canvas: output size, grid-to-pixel conversion, the zoom-safe box,
 * and the two things every card paints - a trimmed block of type, and the
 * seal.
 */
export function createCanvas(scale, { vertical = false } = {}) {
  const SCALE = Number(scale) > 0 ? Number(scale) : DEFAULT_SCALE;
  const gw = vertical ? VERTICAL.w : GRID_W;
  const gh = vertical ? VERTICAL.h : GRID_H;
  const W = Math.round(gw * SCALE);
  const H = Math.round(gh * SCALE);

  // Grid units -> output pixels. Blocks are rasterized straight at their final
  // size, never resized afterwards, so the type stays crisp.
  const px = (n) => Math.round(n * SCALE);

  const inset = (1 - 1 / SCALE) / 2;
  const safe = {
    x: px(gw * inset) + px(PAD),
    top: px(gh * inset) + px(PAD),
  };
  safe.bottom = H - safe.top;
  // Shorts lay the title, channel name and buttons over the lower part of the
  // frame; keep the type clear of the bottom ~22%.
  if (vertical) safe.bottom = Math.min(safe.bottom, px(gh * 0.78));
  safe.w = W - safe.x * 2;

  /**
   * Renders an SVG authored on the grid at `k` times its natural size, then
   * trims it, so the block can be centered on its ink rather than on whatever
   * padding the SVG box happens to carry.
   */
  const block = async (svg, k = 1) => {
    const w = Number(/width="(\d+)"/.exec(svg)[1]);
    const h = Number(/height="(\d+)"/.exec(svg)[1]);
    const sized = svg.replace(
      /^<svg([^>]*?)width="\d+" height="\d+"/,
      `<svg$1width="${px(w * k)}" height="${px(h * k)}"`,
    );
    const buf = await sharp(Buffer.from(sized)).trim({ threshold: 1 }).png().toBuffer();
    const meta = await sharp(buf).metadata();
    return { buf, w: meta.width, h: meta.height };
  };

  /** The seal, trimmed to its ink - the source PNG carries ~17% padding. */
  const seal = async (root, size) =>
    sharp(logoPath(root))
      .trim({ threshold: 1 })
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

  const render = async (dest, layers) => {
    await sharp(Buffer.from(backgroundSvg(W, H, vertical)))
      .composite(layers)
      .png({ compressionLevel: 9 })
      .toFile(dest);
    console.log(`wrote ${dest} (${W}x${H}, ${SCALE}x a ${vertical ? "1080x1920" : "1080p"} frame)`);
    console.log(
      `drop it on a ${vertical ? "1080x1920" : "1080p"} timeline at ${(100 / SCALE).toFixed(0)}% and push in to 100% for a zoom with no softening`,
    );
  };

  return { SCALE, W, H, px, safe, block, seal, render };
}

/**
 * The dojo lockup: the name, a hairline rule and the disciplines. Compact
 * drops the tagline, for a card that has its own line to say underneath -
 * an opening card with a video title. Minimal drops the disciplines too,
 * for the ending card, whose job is the ask rather than the curriculum.
 */
export function dojoNameSvg({ compact, minimal }) {
  const pad = 60;
  const mid = 800 + pad;
  const tagline = compact || minimal
    ? ""
    : `<text x="${mid}" y="256" font-family="${SERIF}" font-style="italic" font-size="36" fill="rgba(${RICE}, 0.66)">${TAGLINE}</text>`;
  const ruleY = compact || minimal ? 244 : 298;
  const discY = compact ? 302 : 356;
  const disciplines = minimal
    ? ""
    : `<text x="${mid}" y="${discY}" font-family="${SANS}" font-size="23" letter-spacing="6.4" fill="rgba(${RICE}, 0.52)">${DISCIPLINES}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${1600 + pad * 2}" height="420" viewBox="0 0 ${1600 + pad * 2} 420">
  <g text-anchor="middle">
    <text x="${mid}" y="96" font-family="${SERIF}" font-weight="700" font-size="88" fill="#FFFFFF">Weatherford</text>
    <text x="${mid}" y="196" font-family="${SERIF}" font-weight="700" font-size="88" fill="#FFFFFF"><tspan fill="${RED}">Martial Arts</tspan> Center</text>
    ${tagline}
    <rect x="${mid - 120}" y="${ruleY}" width="240" height="1" fill="rgba(${RICE}, 0.22)"/>
    ${disciplines}
  </g>
</svg>`;
}
