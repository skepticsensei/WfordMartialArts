/**
 * Renders the dojo's opening card for YouTube videos:
 *   public/banners/youtube-opening-card.png   1920 x 1080
 *
 * Hold it on screen for 3-5 seconds at the head of a video. Same ink ground,
 * weave, seal and type as the channel banner (scripts/generate-youtube-art.mjs)
 * so the channel reads as one piece.
 *
 * Canvas:     1920 x 1080 - 1080p, scales cleanly to 4K.
 * Title safe: 1728 x 972 (90%), centered - nothing readable goes outside it,
 *             so the card survives overscan and a phone's rounded corners.
 *
 * A per-video title is optional; without one you get the plain brand card.
 *
 * Usage:
 *   node scripts/generate-opening-card.mjs
 *   node scripts/generate-opening-card.mjs --title "Kuzushi in Tomiki Aikido"
 *   node scripts/generate-opening-card.mjs --title "Ukemi Basics" \
 *     --subtitle "Beginner Series - Episode 1" --out public/banners/ukemi.png
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

const W = 1920;
const H = 1080;
const SAFE_W = Math.round(W * 0.9);

const INK = "#171717";
const RED = "#B21E2B";
const RICE = "247, 243, 235";

// The seal gives up a little height when a per-video title has to fit under
// the name block; the rest of the layout is measured, so it follows along.
const SEAL_PLAIN = 262; // rendered size of the seal's ink, not its padded box
const SEAL_TITLED = 214;
const GAP_SEAL = 50; // seal -> name block
const GAP_TITLE = 46; // name block -> per-video title block
const URL_ZONE = 150; // reserved strip along the bottom for the web address
const DISCIPLINES = "AIKIDO · JUDO · AIKIJUJUTSU · KARATE";
const TAGLINE = "Traditional Arts. Timeless Discipline.";
const URL_TEXT = "WFORDMARTIALARTS.COM";

function parseArgs(argv) {
  const args = { title: "", subtitle: "", out: "" };
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
  for (let x = -H; x < W + H; x += 32) {
    lines.push(`<line x1="${x}" y1="${H}" x2="${x + H}" y2="0"/>`);
  }
  return `<g stroke="rgba(${RICE}, 0.035)" stroke-width="2">${lines.join("")}</g>`;
}

function backgroundSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" gradientUnits="userSpaceOnUse"
      cx="${W / 2}" cy="${H * 0.46}" r="900"
      gradientTransform="translate(0, ${H * 0.46 * (1 - 620 / 900)}) scale(1, ${620 / 900})">
      <stop offset="0" stop-color="${RED}" stop-opacity="0.34"/>
      <stop offset="0.55" stop-color="${RED}" stop-opacity="0.11"/>
      <stop offset="1" stop-color="${RED}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" gradientUnits="userSpaceOnUse"
      cx="${W / 2}" cy="${H / 2}" r="1180"
      gradientTransform="translate(0, ${(H / 2) * (1 - 760 / 1180)}) scale(1, ${760 / 1180})">
      <stop offset="0.40" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.62"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${INK}"/>
  ${weave()}
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Decorative kanji out at the edges: bu / do, "the martial way" -->
  <g font-family="${SERIF}" font-weight="700" font-size="560" fill="rgba(${RICE}, 0.05)" dominant-baseline="central">
    <text x="-40" y="${H / 2}" text-anchor="start">&#x6B66;</text>
    <text x="${W + 40}" y="${H / 2}" text-anchor="end">&#x9053;</text>
  </g>

  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
</svg>`;
}

/**
 * Blocks are drawn against transparency at a generous size, then trimmed and
 * measured, so each one can be centered on its ink rather than on whatever
 * padding the SVG box happens to carry.
 */
function nameSvg() {
  const pad = 60;
  const mid = 800 + pad;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${1600 + pad * 2}" height="420" viewBox="0 0 ${1600 + pad * 2} 420">
  <g text-anchor="middle">
    <text x="${mid}" y="96" font-family="${SERIF}" font-weight="700" font-size="88" fill="#FFFFFF">Weatherford</text>
    <text x="${mid}" y="196" font-family="${SERIF}" font-weight="700" font-size="88" fill="#FFFFFF"><tspan fill="${RED}">Martial Arts</tspan> Center</text>
    <text x="${mid}" y="256" font-family="${SERIF}" font-style="italic" font-size="36" fill="rgba(${RICE}, 0.66)">${TAGLINE}</text>
    <rect x="${mid - 120}" y="298" width="240" height="1" fill="rgba(${RICE}, 0.22)"/>
    <text x="${mid}" y="356" font-family="${SANS}" font-size="23" letter-spacing="6.4" fill="rgba(${RICE}, 0.52)">${DISCIPLINES}</text>
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

async function block(svg) {
  const buf = await sharp(Buffer.from(svg)).trim({ threshold: 1 }).png().toBuffer();
  const meta = await sharp(buf).metadata();
  return { buf, w: meta.width, h: meta.height };
}

async function main() {
  const { title, subtitle, out } = parseArgs(process.argv.slice(2));
  await ensureFonts(ROOT);
  await mkdir(join(ROOT, "public", "banners"), { recursive: true });

  const dest = out
    ? resolve(ROOT, out)
    : title
      ? join(ROOT, "public", "banners", `opening-card-${slug(title)}.png`)
      : DEFAULT_OUT;

  // Seal, trimmed to its ink then scaled - the source PNG carries ~17% padding.
  const sealSize = title ? SEAL_TITLED : SEAL_PLAIN;
  const seal = await sharp(LOGO)
    .trim({ threshold: 1 })
    .resize(sealSize, sealSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const name = await block(nameSvg());
  const titleBlock = title ? await block(titleSvg(title, subtitle)) : null;
  const url = await block(urlSvg());

  const contentH =
    sealSize + GAP_SEAL + name.h + (titleBlock ? GAP_TITLE + titleBlock.h : 0);
  // Centered in what is left above the web address, then nudged down a touch:
  // optically the stack wants to sit slightly below the true middle.
  let y = Math.round((H - URL_ZONE - contentH) / 2) + 24;

  const layers = [];
  layers.push({ input: seal, left: Math.round((W - sealSize) / 2), top: y });
  y += sealSize + GAP_SEAL;
  layers.push({ input: name.buf, left: Math.round((W - name.w) / 2), top: y });
  y += name.h;
  if (titleBlock) {
    y += GAP_TITLE;
    layers.push({ input: titleBlock.buf, left: Math.round((W - titleBlock.w) / 2), top: y });
  }
  layers.push({ input: url.buf, left: Math.round((W - url.w) / 2), top: H - 100 });

  const widest = Math.max(name.w, titleBlock?.w ?? 0);
  if (widest > SAFE_W) {
    console.warn(`WARNING: content is ${widest}px, wider than the ${SAFE_W}px title-safe area`);
  }

  await sharp(Buffer.from(backgroundSvg()))
    .composite(layers)
    .png({ compressionLevel: 9 })
    .toFile(dest);

  const meta = await sharp(dest).metadata();
  console.log(
    `wrote ${dest} (${meta.width}x${meta.height}); stack ${contentH}px tall, widest block ${widest}px in a ${SAFE_W}px title-safe area`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
