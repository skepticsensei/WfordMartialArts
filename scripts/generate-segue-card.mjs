/**
 * Renders a segue card - the title card that introduces a section of a video:
 *   public/banners/segue-tegatana-no-kata.png   2400 x 1350
 *
 * The seal sits at the top, the Japanese name reads large underneath, and the
 * English name follows in parentheses. Same ground as the opening card, only
 * quieter: no dojo name, no tagline, no web address, because by the time a
 * segue lands the viewer has already seen all three.
 *
 * The canvas, the zoom headroom and the zoom-safe area come from
 * scripts/lib/card-ground.mjs. A long name is rendered a notch smaller rather
 * than pushed outside that band.
 *
 * Usage:
 *   node scripts/generate-segue-card.mjs
 *   node scripts/generate-segue-card.mjs --title "Koryu no Kata Dai San" \
 *     --subtitle "(Third Classical Form)"
 *   node scripts/generate-segue-card.mjs --title "Randori" --subtitle "" \
 *     --out public/banners/segue-randori.png
 *   node scripts/generate-segue-card.mjs --scale 1.5   # more zoom headroom
 *
 * Fonts download once into .cache/fonts (gitignored).
 */
import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { ensureFonts, SERIF } from "./lib/brand-fonts.mjs";
import { RED, RICE, createCanvas, esc, parseArgs, slug } from "./lib/card-ground.mjs";

const ROOT = process.cwd();

const SEAL = 208; // rendered size of the seal's ink, not its padded box
const GAP_SEAL = 78; // seal -> heading
const HEADING = 124;
const SUBTITLE = 46;

/**
 * Heading and its English reading, drawn as one block so the pair is measured
 * and centered together. The red rule ties them to the seal above without
 * repeating the dojo's name.
 */
function headingSvg(title, subtitle) {
  const pad = 80;
  const mid = 840 + pad;
  const sub = subtitle
    ? `<text x="${mid}" y="248" font-family="${SERIF}" font-style="italic" font-size="${SUBTITLE}" fill="rgba(${RICE}, 0.62)">${esc(subtitle)}</text>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${1680 + pad * 2}" height="320" viewBox="0 0 ${1680 + pad * 2} 320">
  <g text-anchor="middle">
    <rect x="${mid - 46}" y="20" width="92" height="3" fill="${RED}"/>
    <text x="${mid}" y="164" font-family="${SERIF}" font-weight="700" font-size="${HEADING}" fill="#FFFFFF">${esc(title)}</text>
    ${sub}
  </g>
</svg>`;
}

async function main() {
  const { title, subtitle, out, scale } = parseArgs(process.argv.slice(2), {
    title: "Tegatana no Kata",
    subtitle: "(The Walking Kata)",
    out: "",
    scale: "",
  });
  const { W, px, safe, block, seal: sealAt, render } = createCanvas(scale);

  await ensureFonts(ROOT);
  await mkdir(join(ROOT, "public", "banners"), { recursive: true });

  const dest = out
    ? resolve(ROOT, out)
    : join(ROOT, "public", "banners", `segue-${slug(title)}.png`);

  const band = safe.bottom - safe.top;

  // Measured at full size first, then again a notch smaller if the name runs
  // past the zoom-safe band in either direction.
  const measure = async (k) => {
    const heading = await block(headingSvg(title, subtitle), k);
    const seal = px(SEAL * k);
    return { k, heading, seal, h: seal + px(GAP_SEAL * k) + heading.h };
  };

  let stack = await measure(1);
  const fit = Math.min(band / stack.h, safe.w / stack.heading.w, 1);
  if (fit < 1) {
    const k = fit * 0.99;
    stack = await measure(k);
    console.log(`stack rendered at ${(k * 100).toFixed(0)}% to fit the zoom-safe area`);
  }

  const seal = await sealAt(ROOT, stack.seal);

  // Centered in the zoom-safe band, nudged down a touch: optically the stack
  // wants to sit slightly below the true middle.
  let y = Math.round(safe.top + (band - stack.h) / 2 + px(10));

  const layers = [
    { input: seal, left: Math.round((W - stack.seal) / 2), top: y },
  ];
  y += stack.seal + px(GAP_SEAL * stack.k);
  layers.push({ input: stack.heading.buf, left: Math.round((W - stack.heading.w) / 2), top: y });

  await render(dest, layers);
  console.log(
    `stack ${stack.h}px in a ${band}px zoom-safe band, heading ${stack.heading.w}px of ${safe.w}px`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
