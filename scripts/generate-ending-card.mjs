/**
 * Renders the dojo's ending card for YouTube videos:
 *   public/banners/youtube-ending-card.png   2400 x 1350
 *
 * Hold it for the last 15-20 seconds of a video, which is how long YouTube
 * needs to show end screen elements over it.
 *
 * The stack sits high and the bottom of the frame is left deliberately empty:
 * that is where the subscribe button and the "watch next" thumbnails go when
 * you place them in YouTube Studio. Set --reserve 0 to center the stack in the
 * whole frame instead, for a video that ends without those elements.
 *
 * The ask is one quiet line rather than a shout. The dojo's voice is the
 * reason people subscribe; asking in someone else's voice would cost more
 * than it earns.
 *
 * The canvas, the zoom headroom and the zoom-safe area come from
 * scripts/lib/card-ground.mjs.
 *
 * Usage:
 *   node scripts/generate-ending-card.mjs
 *   node scripts/generate-ending-card.mjs --message "See you on the mat."
 *   node scripts/generate-ending-card.mjs --reserve 0   # no end screen room
 *   node scripts/generate-ending-card.mjs --scale 1.5   # more zoom headroom
 *
 * Fonts download once into .cache/fonts (gitignored).
 */
import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { ensureFonts, SERIF, SANS } from "./lib/brand-fonts.mjs";
import { RICE, createCanvas, dojoNameSvg, esc, parseArgs } from "./lib/card-ground.mjs";

const ROOT = process.cwd();
const DEFAULT_OUT = join(ROOT, "public", "banners", "youtube-ending-card.png");

const SEAL = 176; // rendered size of the seal's ink, not its padded box
const GAP_SEAL = 46; // seal -> name block
const GAP_SIGNOFF = 56; // name block -> sign-off
const RESERVE = 240; // room at the bottom for YouTube's end screen elements
const MESSAGE = "Thank you for training with us.";
const CTA = "LIKE · SUBSCRIBE · WFORDMARTIALARTS.COM";

/** The sign-off: a line in the dojo's voice, then the ask under it. */
function signoffSvg(message) {
  const pad = 60;
  const mid = 800 + pad;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${1600 + pad * 2}" height="200" viewBox="0 0 ${1600 + pad * 2} 200">
  <g text-anchor="middle">
    <text x="${mid}" y="60" font-family="${SERIF}" font-style="italic" font-size="42" fill="rgba(${RICE}, 0.72)">${esc(message)}</text>
    <text x="${mid}" y="132" font-family="${SANS}" font-weight="500" font-size="26" letter-spacing="6.2" fill="#C9414D">${CTA}</text>
  </g>
</svg>`;
}

async function main() {
  const { message, reserve, out, scale } = parseArgs(process.argv.slice(2), {
    message: MESSAGE,
    reserve: String(RESERVE),
    out: "",
    scale: "",
  });
  const { W, px, safe, block, seal: sealAt, render } = createCanvas(scale);

  await ensureFonts(ROOT);
  await mkdir(join(ROOT, "public", "banners"), { recursive: true });

  const dest = out ? resolve(ROOT, out) : DEFAULT_OUT;
  const reserved = px(Math.max(0, Number(reserve) || 0));
  const band = safe.bottom - reserved - safe.top;

  const measure = async (k) => {
    const name = await block(dojoNameSvg({ minimal: true }), k);
    const signoff = await block(signoffSvg(message), k);
    const seal = px(SEAL * k);
    const h = seal + px(GAP_SEAL * k) + name.h + px(GAP_SIGNOFF * k) + signoff.h;
    return { k, name, signoff, seal, h };
  };

  let stack = await measure(1);
  const widest = Math.max(stack.name.w, stack.signoff.w);
  const fit = Math.min(band / stack.h, safe.w / widest, 1);
  if (fit < 1) {
    const k = fit * 0.99;
    stack = await measure(k);
    console.log(`stack rendered at ${(k * 100).toFixed(0)}% to fit the zoom-safe area`);
  }

  const seal = await sealAt(ROOT, stack.seal);

  let y = Math.round(safe.top + (band - stack.h) / 2);
  const layers = [{ input: seal, left: Math.round((W - stack.seal) / 2), top: y }];
  y += stack.seal + px(GAP_SEAL * stack.k);
  layers.push({ input: stack.name.buf, left: Math.round((W - stack.name.w) / 2), top: y });
  y += stack.name.h + px(GAP_SIGNOFF * stack.k);
  layers.push({ input: stack.signoff.buf, left: Math.round((W - stack.signoff.w) / 2), top: y });

  await render(dest, layers);
  console.log(
    `stack ${stack.h}px in a ${band}px band${reserved ? `, ${reserved}px left clear at the bottom for end screen elements` : ""}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
