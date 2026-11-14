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
 *   node scripts/generate-segue-card.mjs --vertical --title "Three Levels of Uke" \
 *     --subtitle ""                          # 1080x1920 card for a YouTube Short
 *
 * --vertical renders a Shorts card (public/banners/short-<title>.png), keeps
 * the type clear of the Shorts overlay at the bottom, and wraps a longer title
 * over two lines. Put "|" in a title to choose the break yourself.
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

const LINE = 148; // heading line height, for titles that wrap

/**
 * Splits a title into lines. A "|" in the title forces a break; otherwise a
 * vertical card balances anything longer than a short phrase over two lines,
 * since the narrow frame would shrink it to nothing on one.
 */
function headingLines(title, vertical) {
  if (title.includes("|")) return title.split("|").map((t) => t.trim()).filter(Boolean);
  const words = title.split(/\s+/);
  if (!vertical || title.length <= 12 || words.length < 2) return [title];
  let best = [title];
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i += 1) {
    const a = words.slice(0, i).join(" ");
    const b = words.slice(i).join(" ");
    const diff = Math.abs(a.length - b.length);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = [a, b];
    }
  }
  return best;
}

/**
 * Heading and its English reading, drawn as one block so the pair is measured
 * and centered together. The red rule ties them to the seal above without
 * repeating the dojo's name.
 */
function headingSvg(lines, subtitle) {
  const pad = 80;
  const mid = 840 + pad;
  const extra = (lines.length - 1) * LINE;
  const heading = lines
    .map(
      (line, i) =>
        `<text x="${mid}" y="${164 + i * LINE}" font-family="${SERIF}" font-weight="700" font-size="${HEADING}" fill="#FFFFFF">${esc(line)}</text>`,
    )
    .join("");
  const sub = subtitle
    ? `<text x="${mid}" y="${248 + extra}" font-family="${SERIF}" font-style="italic" font-size="${SUBTITLE}" fill="rgba(${RICE}, 0.62)">${esc(subtitle)}</text>`
    : "";
  const h = 320 + extra;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${1680 + pad * 2}" height="${h}" viewBox="0 0 ${1680 + pad * 2} ${h}">
  <g text-anchor="middle">
    <rect x="${mid - 46}" y="20" width="92" height="3" fill="${RED}"/>
    ${heading}
    ${sub}
  </g>
</svg>`;
}

async function main() {
  const argv = process.argv.slice(2);
  const vertical = argv.includes("--vertical");
  const { title, subtitle, out, scale } = parseArgs(argv.filter((a) => a !== "--vertical"), {
    title: "Tegatana no Kata",
    subtitle: "(The Walking Kata)",
    out: "",
    scale: "",
  });
  const { W, px, safe, block, seal: sealAt, render } = createCanvas(scale, { vertical });
  const lines = headingLines(title, vertical);

  await ensureFonts(ROOT);
  await mkdir(join(ROOT, "public", "banners"), { recursive: true });

  const dest = out
    ? resolve(ROOT, out)
    : join(ROOT, "public", "banners", `${vertical ? "short" : "segue"}-${slug(title.replace(/\|/g, " "))}.png`);

  const band = safe.bottom - safe.top;

  // Measured at full size first, then again a notch smaller if the name runs
  // past the zoom-safe band in either direction.
  const measure = async (k) => {
    const heading = await block(headingSvg(lines, subtitle), k);
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
