/**
 * Renders the dojo's opening card for YouTube videos:
 *   public/banners/youtube-opening-card.png   2400 x 1350
 *
 * Hold it on screen for 3-5 seconds at the head of a video. Same ink ground,
 * weave, seal and type as the channel banner (scripts/generate-youtube-art.mjs)
 * so the channel reads as one piece.
 *
 * Canvas: the card is composed on a 1920 x 1080 grid and rendered at SCALE
 * (1.25 by default), i.e. 2400 x 1350, which is the headroom a slow push-in
 * needs. Drop it on a 1080p timeline, where it lands at 80%, and animate
 * anywhere between 80% and 100%: every frame comes off real pixels, so
 * nothing softens, and the ground never runs out at the edges.
 *
 * Zoom-safe area: the part still on screen at 100%, which is the middle
 * 1536 x 864 of the grid. Everything readable is kept inside it (with a
 * little padding), so a push-in all the way to native never crops the type.
 * If a title makes the stack too tall for that band, the whole stack is
 * rendered a notch smaller rather than pushed out of it.
 *
 * A per-video title is optional; without one you get the plain brand card.
 *
 * Usage:
 *   node scripts/generate-opening-card.mjs
 *   node scripts/generate-opening-card.mjs --title "Kuzushi in Tomiki Aikido"
 *   node scripts/generate-opening-card.mjs --title "Ukemi Basics" \
 *     --subtitle "Beginner Series - Episode 1" --out public/banners/ukemi.png
 *   node scripts/generate-opening-card.mjs --scale 1.5   # more zoom headroom
 *
 * Fonts download once into .cache/fonts (gitignored).
 */
import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import sharp from "sharp";
import { ensureFonts, SERIF, SANS } from "./lib/brand-fonts.mjs";

const ROOT = process.cwd();
const LOGO = join(ROOT, "public", "logos", "Weatherford_Martial_Arts.png");
const DEFAULT_OUT = join(ROOT, "public", "banners", "youtube-opening-card.png");

/** Composition grid. Output pixels are these times SCALE. */
const GRID_W = 1920;
const GRID_H = 1080;
const DEFAULT_SCALE = 1.25;

const INK = "#171717";
const RED = "#B21E2B";
const RICE = "247, 243, 235";

const PAD = 40; // breathing room inside the zoom-safe area
const STACK_GAP = 90; // stack -> web address
const SEAL_PLAIN = 262; // rendered size of the seal's ink, not its padded box
const SEAL_TITLED = 214;
const GAP_SEAL = 50; // seal -> name block
const GAP_TITLE = 46; // name block -> per-video title block
const DISCIPLINES = "AIKIDO · JUDO · AIKIJUJUTSU · KARATE";
const TAGLINE = "Traditional Arts. Timeless Discipline.";
const URL_TEXT = "WFORDMARTIALARTS.COM";

function parseArgs(argv) {
  const args = { title: "", subtitle: "", out: "", scale: "" };
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i].replace(/^--/, "");
    if (key in args) {
      args[key] = argv[i + 1] ?? "";
      i += 1;
    }
  }
  return args;
}

/** SVG text is not markup-escaped by sharp; do it here. */
function esc(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function slug(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
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
 * The ground is drawn on the 1920 x 1080 grid and rasterized at the output
 * size, so the glow and the vignette keep their proportions at any scale.
 * Both are stretched well past the frame: a push-in crops into them, and a
 * gradient that ended at the edge would show its rim as soon as it did.
 */
function backgroundSvg(outW, outH) {
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
 * Blocks are drawn against transparency at a generous size, then trimmed and
 * measured, so each one can be centered on its ink rather than on whatever
 * padding the SVG box happens to carry.
 *
 * With a per-video title under it, the name block goes compact: the title is
 * the line that wants reading, and the tagline underneath it only crowds the
 * stack against the zoom-safe edge.
 */
function nameSvg({ compact }) {
  const pad = 60;
  const mid = 800 + pad;
  const tagline = compact
    ? ""
    : `<text x="${mid}" y="256" font-family="${SERIF}" font-style="italic" font-size="36" fill="rgba(${RICE}, 0.66)">${TAGLINE}</text>`;
  const ruleY = compact ? 244 : 298;
  const discY = compact ? 302 : 356;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${1600 + pad * 2}" height="420" viewBox="0 0 ${1600 + pad * 2} 420">
  <g text-anchor="middle">
    <text x="${mid}" y="96" font-family="${SERIF}" font-weight="700" font-size="88" fill="#FFFFFF">Weatherford</text>
    <text x="${mid}" y="196" font-family="${SERIF}" font-weight="700" font-size="88" fill="#FFFFFF"><tspan fill="${RED}">Martial Arts</tspan> Center</text>
    ${tagline}
    <rect x="${mid - 120}" y="${ruleY}" width="240" height="1" fill="rgba(${RICE}, 0.22)"/>
    <text x="${mid}" y="${discY}" font-family="${SANS}" font-size="23" letter-spacing="6.4" fill="rgba(${RICE}, 0.52)">${DISCIPLINES}</text>
  </g>
</svg>`;
}

/** Per-video title, sat under a short red rule. Omitted when no title is given. */
function titleSvg(title, subtitle) {
  const pad = 60;
  const mid = 800 + pad;
  const sub = subtitle
    ? `<text x="${mid}" y="180" font-family="${SANS}" font-size="24" letter-spacing="4" fill="rgba(${RICE}, 0.54)">${esc(subtitle.toUpperCase())}</text>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${1600 + pad * 2}" height="240" viewBox="0 0 ${1600 + pad * 2} 240">
  <g text-anchor="middle">
    <rect x="${mid - 44}" y="20" width="88" height="3" fill="${RED}"/>
    <text x="${mid}" y="124" font-family="${SERIF}" font-weight="700" font-size="54" fill="#FFFFFF">${esc(title)}</text>
    ${sub}
  </g>
</svg>`;
}

function urlSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="80" viewBox="0 0 900 80">
  <text x="450" y="50" text-anchor="middle" font-family="${SANS}" font-weight="500" font-size="25" letter-spacing="6.6" fill="#C9414D">${URL_TEXT}</text>
</svg>`;
}

async function main() {
  const { title, subtitle, out, scale } = parseArgs(process.argv.slice(2));
  const SCALE = Number(scale) > 0 ? Number(scale) : DEFAULT_SCALE;
  const W = Math.round(GRID_W * SCALE);
  const H = Math.round(GRID_H * SCALE);

  // Grid units -> output pixels. Blocks are rasterized straight at their final
  // size, never resized afterwards, so the type stays crisp.
  const px = (n) => Math.round(n * SCALE);

  /** Renders an SVG authored on the grid at `k` times its natural size. */
  const block = async (svg, k = 1) => {
    const natural = Number(/width="(\d+)"/.exec(svg)[1]);
    const sized = svg.replace(
      /^<svg([^>]*?)width="\d+" height="\d+"/,
      `<svg$1width="${px(natural * k)}" height="${px(
        Number(/height="(\d+)"/.exec(svg)[1]) * k,
      )}"`,
    );
    const buf = await sharp(Buffer.from(sized)).trim({ threshold: 1 }).png().toBuffer();
    const meta = await sharp(buf).metadata();
    return { buf, w: meta.width, h: meta.height };
  };

  await ensureFonts(ROOT);
  await mkdir(join(ROOT, "public", "banners"), { recursive: true });

  const dest = out
    ? resolve(ROOT, out)
    : title
      ? join(ROOT, "public", "banners", `opening-card-${slug(title)}.png`)
      : DEFAULT_OUT;

  // The middle of the frame that is still on screen at a full push-in, plus
  // a little padding. Everything readable lives in here.
  const inset = (1 - 1 / SCALE) / 2;
  const safeX = px(GRID_W * inset) + px(PAD);
  const safeTop = px(GRID_H * inset) + px(PAD);
  const safeBottom = H - safeTop;
  const safeW = W - safeX * 2;

  const url = await block(urlSvg());
  const bandTop = safeTop;
  const bandBottom = safeBottom - url.h - px(STACK_GAP);

  // First pass at full size to measure, then a second pass a notch smaller if
  // the stack would otherwise reach past the zoom-safe band.
  const sealSize = title ? SEAL_TITLED : SEAL_PLAIN;
  const measure = async (k) => {
    const name = await block(nameSvg({ compact: Boolean(title) }), k);
    const titleBlock = title ? await block(titleSvg(title, subtitle), k) : null;
    const seal = px(sealSize * k);
    const h = seal + px(GAP_SEAL * k) + name.h + (titleBlock ? px(GAP_TITLE * k) + titleBlock.h : 0);
    return { k, name, titleBlock, seal, h };
  };

  let stack = await measure(1);
  const band = bandBottom - bandTop;
  if (stack.h > band) {
    const k = (band / stack.h) * 0.99;
    stack = await measure(k);
    console.log(`stack rendered at ${(k * 100).toFixed(0)}% to fit the zoom-safe band`);
  }

  // Seal, trimmed to its ink then scaled - the source PNG carries ~17% padding.
  const seal = await sharp(LOGO)
    .trim({ threshold: 1 })
    .resize(stack.seal, stack.seal, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Centered in the band, then nudged down a touch: optically the stack wants
  // to sit slightly below the true middle.
  let y = Math.round(bandTop + (band - stack.h) / 2 + px(12));

  const layers = [];
  layers.push({ input: seal, left: Math.round((W - stack.seal) / 2), top: y });
  y += stack.seal + px(GAP_SEAL * stack.k);
  layers.push({ input: stack.name.buf, left: Math.round((W - stack.name.w) / 2), top: y });
  y += stack.name.h;
  if (stack.titleBlock) {
    y += px(GAP_TITLE * stack.k);
    layers.push({
      input: stack.titleBlock.buf,
      left: Math.round((W - stack.titleBlock.w) / 2),
      top: y,
    });
  }
  layers.push({ input: url.buf, left: Math.round((W - url.w) / 2), top: safeBottom - url.h });

  const widest = Math.max(stack.name.w, stack.titleBlock?.w ?? 0);
  if (widest > safeW) {
    console.warn(`WARNING: content is ${widest}px, wider than the ${safeW}px zoom-safe area`);
  }

  await sharp(Buffer.from(backgroundSvg(W, H)))
    .composite(layers)
    .png({ compressionLevel: 9 })
    .toFile(dest);

  console.log(
    `wrote ${dest} (${W}x${H}, ${SCALE}x a 1080p frame); stack ${stack.h}px in a ${band}px zoom-safe band, widest block ${widest}px of ${safeW}px`,
  );
  console.log(
    `drop it on a 1080p timeline at ${(100 / SCALE).toFixed(0)}% and push in to 100% for a zoom with no softening`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
