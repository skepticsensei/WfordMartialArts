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

export const GRID_W = 1920;
export const GRID_H = 1080;
export const DEFAULT_SCALE = 1.25;

export const INK = "#171717";
export const RED = "#B21E2B";
export const RICE = "247, 243, 235";

const PAD = 40; // breathing room inside the zoom-safe area

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

/** Diagonal weave, same texture as the site hero and the channel banner. */
function weave() {
  const lines = [];
  for (let x = -GRID_H; x < GRID_W + GRID_H; x += 32) {
    lines.push(`<line x1="${x}" y1="${GRID_H}" x2="${x + GRID_H}" y2="0"/>`);
  }
  return `<g stroke="rgba(${RICE}, 0.035)" stroke-width="2">${lines.join("")}</g>`;
}

/**
 * The ground is drawn on the grid and rasterized at the output size, so the
 * glow and the vignette keep their proportions at any scale. Both are
 * stretched well past the frame: a push-in crops into them, and a gradient
 * that ended at the edge would show its rim as soon as it did.
 */
export function backgroundSvg(outW, outH) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${outW}" height="${outH}" viewBox="0 0 ${GRID_W} ${GRID_H}">
  <defs>
    <radialGradient id="glow" gradientUnits="userSpaceOnUse"
      cx="${GRID_W / 2}" cy="${GRID_H * 0.46}" r="1060"
      gradientTransform="translate(0, ${GRID_H * 0.46 * (1 - 730 / 1060)}) scale(1, ${730 / 1060})">
      <stop offset="0" stop-color="${RED}" stop-opacity="0.34"/>
      <stop offset="0.55" stop-color="${RED}" stop-opacity="0.11"/>
      <stop offset="1" stop-color="${RED}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" gradientUnits="userSpaceOnUse"
      cx="${GRID_W / 2}" cy="${GRID_H / 2}" r="1390"
      gradientTransform="translate(0, ${(GRID_H / 2) * (1 - 890 / 1390)}) scale(1, ${890 / 1390})">
      <stop offset="0.40" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.62"/>
    </radialGradient>
  </defs>

  <rect width="${GRID_W}" height="${GRID_H}" fill="${INK}"/>
  ${weave()}
  <rect width="${GRID_W}" height="${GRID_H}" fill="url(#glow)"/>

  <rect width="${GRID_W}" height="${GRID_H}" fill="url(#vignette)"/>
</svg>`;
}

/**
 * A card's canvas: output size, grid-to-pixel conversion, the zoom-safe box,
 * and the two things every card paints - a trimmed block of type, and the
 * seal.
 */
export function createCanvas(scale) {
  const SCALE = Number(scale) > 0 ? Number(scale) : DEFAULT_SCALE;
  const W = Math.round(GRID_W * SCALE);
  const H = Math.round(GRID_H * SCALE);

  // Grid units -> output pixels. Blocks are rasterized straight at their final
  // size, never resized afterwards, so the type stays crisp.
  const px = (n) => Math.round(n * SCALE);

  const inset = (1 - 1 / SCALE) / 2;
  const safe = {
    x: px(GRID_W * inset) + px(PAD),
    top: px(GRID_H * inset) + px(PAD),
  };
  safe.bottom = H - safe.top;
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
    await sharp(Buffer.from(backgroundSvg(W, H)))
      .composite(layers)
      .png({ compressionLevel: 9 })
      .toFile(dest);
    console.log(`wrote ${dest} (${W}x${H}, ${SCALE}x a 1080p frame)`);
    console.log(
      `drop it on a 1080p timeline at ${(100 / SCALE).toFixed(0)}% and push in to 100% for a zoom with no softening`,
    );
  };

  return { SCALE, W, H, px, safe, block, seal, render };
}
