/**
 * Renders the dojo's opening card for YouTube videos:
 *   public/banners/youtube-opening-card.png   2400 x 1350
 *
 * Hold it on screen for 3-5 seconds at the head of a video. Same ink ground,
 * weave, seal and type as the channel banner (scripts/generate-youtube-art.mjs)
 * so the channel reads as one piece.
 *
 * The canvas, the zoom headroom and the zoom-safe area all come from
 * scripts/lib/card-ground.mjs. If a title makes the stack too tall for that
 * band, the whole stack is rendered a notch smaller rather than pushed out
 * of it.
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
import { ensureFonts, SERIF, SANS } from "./lib/brand-fonts.mjs";
import { RED, RICE, createCanvas, dojoNameSvg, esc, parseArgs, slug } from "./lib/card-ground.mjs";

const ROOT = process.cwd();
const DEFAULT_OUT = join(ROOT, "public", "banners", "youtube-opening-card.png");

const STACK_GAP = 90; // stack -> web address
const SEAL_PLAIN = 262; // rendered size of the seal's ink, not its padded box
const SEAL_TITLED = 214;
const GAP_SEAL = 50; // seal -> name block
const GAP_TITLE = 46; // name block -> per-video title block
const URL_TEXT = "WFORDMARTIALARTS.COM";

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
  const { title, subtitle, out, scale } = parseArgs(process.argv.slice(2), {
    title: "",
    subtitle: "",
    out: "",
    scale: "",
  });
  const { W, px, safe, block, seal: sealAt, render } = createCanvas(scale);

  await ensureFonts(ROOT);
  await mkdir(join(ROOT, "public", "banners"), { recursive: true });

  const dest = out
    ? resolve(ROOT, out)
    : title
      ? join(ROOT, "public", "banners", `opening-card-${slug(title)}.png`)
      : DEFAULT_OUT;

  const url = await block(urlSvg());
  const bandTop = safe.top;
  const bandBottom = safe.bottom - url.h - px(STACK_GAP);
  const band = bandBottom - bandTop;

  // First pass at full size to measure, then a second pass a notch smaller if
  // the stack would otherwise reach past the zoom-safe band.
  const sealSize = title ? SEAL_TITLED : SEAL_PLAIN;
  const measure = async (k) => {
    const name = await block(dojoNameSvg({ compact: Boolean(title) }), k);
    const titleBlock = title ? await block(titleSvg(title, subtitle), k) : null;
    const seal = px(sealSize * k);
    const h = seal + px(GAP_SEAL * k) + name.h + (titleBlock ? px(GAP_TITLE * k) + titleBlock.h : 0);
    return { k, name, titleBlock, seal, h };
  };

  let stack = await measure(1);
  if (stack.h > band) {
    const k = (band / stack.h) * 0.99;
    stack = await measure(k);
    console.log(`stack rendered at ${(k * 100).toFixed(0)}% to fit the zoom-safe band`);
  }

  const seal = await sealAt(ROOT, stack.seal);

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
  layers.push({ input: url.buf, left: Math.round((W - url.w) / 2), top: safe.bottom - url.h });

  const widest = Math.max(stack.name.w, stack.titleBlock?.w ?? 0);
  if (widest > safe.w) {
    console.warn(`WARNING: content is ${widest}px, wider than the ${safe.w}px zoom-safe area`);
  }

  await render(dest, layers);
  console.log(
    `stack ${stack.h}px in a ${band}px zoom-safe band, widest block ${widest}px of ${safe.w}px`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
