/**
 * Renders the dojo's YouTube channel art:
 *   public/banners/youtube-banner.png  2560 x 1440 channel banner
 *   public/banners/youtube-avatar.png   800 x  800 channel profile picture
 *   public/banners/youtube-avatar-dark.png   the same mark on an ink ground
 *
 * Canvas:    2560 x 1440 - YouTube's upload size.
 * Safe area: 1546 x 423, centered - the only region guaranteed visible on
 *            phones and inside the TV crop, so everything readable lives there.
 *
 * The seal and the text block are measured (alpha-trimmed) and then centered
 * inside the safe area, so the layout is optically centered rather than
 * centered on whatever transparent padding the source PNG happens to carry.
 *
 * Mirrors the on-page version at /ytbanner - keep the two in sync.
 *
 * Usage: node scripts/generate-youtube-art.mjs
 *
 * Fonts download once into .cache/fonts (gitignored); this box has no system
 * fonts, and sharp comes in with Next's image optimizer.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const FONT_DIR = join(ROOT, ".cache", "fonts");
const OUT = join(ROOT, "public", "banners", "youtube-banner.png");
const OUT_AVATAR = join(ROOT, "public", "banners", "youtube-avatar.png");
const OUT_AVATAR_DARK = join(ROOT, "public", "banners", "youtube-avatar-dark.png");
const LOGO = join(ROOT, "public", "logos", "Weatherford_Martial_Arts.png");

const FONTS = {
  "Inter[opsz,wght].ttf": "ofl/inter/Inter%5Bopsz,wght%5D.ttf",
  "Inter-Italic[opsz,wght].ttf": "ofl/inter/Inter-Italic%5Bopsz,wght%5D.ttf",
  "NotoSerifJP[wght].ttf": "ofl/notoserifjp/NotoSerifJP%5Bwght%5D.ttf",
};

const W = 2560;
const H = 1440;
const SAFE_W = 1546;
const SAFE_H = 423;
const SAFE_X = (W - SAFE_W) / 2;
const SAFE_Y = (H - SAFE_H) / 2;

const INK = "#171717";
const RED = "#B21E2B";
const RICE = "247, 243, 235";
const SERIF = "Noto Serif JP";
const SANS = "Inter";

const SEAL = 344; // rendered size of the seal's ink, not its padded box
const GAP = 66; // seal -> divider -> text
const TAGLINE = "Traditional Arts. Timeless Discipline.";

async function ensureFonts() {
  await mkdir(FONT_DIR, { recursive: true });
  for (const [name, path] of Object.entries(FONTS)) {
    const dest = join(FONT_DIR, name);
    try {
      await access(dest);
      continue;
    } catch {}
    const url = `https://raw.githubusercontent.com/google/fonts/main/${path}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Could not download ${name}: ${res.status}`);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`downloaded ${name}`);
  }
  const conf = join(ROOT, ".cache", "fonts.conf");
  await writeFile(
    conf,
    `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${FONT_DIR}</dir>
  <cachedir>${join(ROOT, ".cache", "fontconfig")}</cachedir>
</fontconfig>
`,
  );
  process.env.FONTCONFIG_FILE = conf;
}

/** Diagonal weave, same texture as the site hero. */
function weave() {
  const lines = [];
  for (let x = -H; x < W + H; x += 42) {
    lines.push(`<line x1="${x}" y1="${H}" x2="${x + H}" y2="0"/>`);
  }
  return `<g stroke="rgba(${RICE}, 0.035)" stroke-width="2">${lines.join("")}</g>`;
}

function backgroundSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" gradientUnits="userSpaceOnUse"
      cx="${W * 0.42}" cy="${H / 2}" r="1150"
      gradientTransform="translate(0, ${(H / 2) * (1 - 660 / 1150)}) scale(1, ${660 / 1150})">
      <stop offset="0" stop-color="${RED}" stop-opacity="0.30"/>
      <stop offset="0.55" stop-color="${RED}" stop-opacity="0.10"/>
      <stop offset="1" stop-color="${RED}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" gradientUnits="userSpaceOnUse"
      cx="${W / 2}" cy="${H / 2}" r="1560"
      gradientTransform="translate(0, ${(H / 2) * (1 - 940 / 1560)}) scale(1, ${940 / 1560})">
      <stop offset="0.42" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.6"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${INK}"/>
  ${weave()}
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Decorative kanji out in the bleed: bu / do, "the martial way" -->
  <g font-family="${SERIF}" font-weight="700" font-size="470" fill="rgba(${RICE}, 0.045)" dominant-baseline="central">
    <text x="70" y="${H / 2}" text-anchor="start">&#x6B66;</text>
    <text x="${W - 70}" y="${H / 2}" text-anchor="end">&#x9053;</text>
  </g>

  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
</svg>`;
}

/** Text block drawn against transparency so it can be measured and placed. */
function textSvg() {
  const pad = 40; // keeps glyph overhang inside the canvas before trimming
  const titleSize = 86;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${SAFE_H}" viewBox="0 0 1200 ${SAFE_H}">
  <text x="${pad}" y="110" font-family="${SERIF}" font-weight="700" font-size="${titleSize}" fill="#FFFFFF">Weatherford</text>
  <text x="${pad}" y="204" font-family="${SERIF}" font-weight="700" font-size="${titleSize}" fill="#FFFFFF"><tspan fill="${RED}">Martial Arts</tspan> Center</text>
  <text x="${pad}" y="270" font-family="${SERIF}" font-style="italic" font-size="34" fill="rgba(${RICE}, 0.62)">${TAGLINE}</text>
  <text x="${pad}" y="322" font-family="${SANS}" font-size="24" letter-spacing="3.36" fill="rgba(${RICE}, 0.48)">AIKIDO &#xB7; JUDO &#xB7; AIKIJUJUTSU &#xB7; WEATHERFORD, TEXAS</text>
  <text x="${pad}" y="366" font-family="${SANS}" font-weight="500" font-size="24" letter-spacing="5.28" fill="#C9414D">WFORDMARTIALARTS.COM</text>
</svg>`;
}


// ---- Profile picture ----
// 800 x 800, cropped to a circle by YouTube and shown as small as 48px, so the
// seal has to sit fully inside that circle and carry the whole mark on its own.
// A hairline ring just inside the crop keeps the edge defined on YouTube's dark
// UI, where an ink ground would otherwise bleed into the page.
const AV = 800;
const AV_SEAL = 520; // half-diagonal 368px, clear of the 400px crop radius
const AV_RING = 386;

function avatarSvg({ light }) {
  const ground = light ? "#F7F3EB" : INK;
  const weaveColor = light ? "23, 23, 23" : RICE;
  const ringColor = light ? "23, 23, 23" : RICE;
  const ringAlpha = light ? 0.14 : 0.16;
  const glowAlpha = light ? 0.1 : 0.34;

  const lines = [];
  for (let x = -AV; x < AV * 2; x += 24) {
    lines.push(`<line x1="${x}" y1="${AV}" x2="${x + AV}" y2="0"/>`);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${AV}" height="${AV}" viewBox="0 0 ${AV} ${AV}">
  <defs>
    <radialGradient id="glow" gradientUnits="userSpaceOnUse" cx="${AV / 2}" cy="${AV / 2}" r="430">
      <stop offset="0" stop-color="${RED}" stop-opacity="${glowAlpha}"/>
      <stop offset="0.6" stop-color="${RED}" stop-opacity="${glowAlpha * 0.35}"/>
      <stop offset="1" stop-color="${RED}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${AV}" height="${AV}" fill="${ground}"/>
  <g stroke="rgba(${weaveColor}, 0.04)" stroke-width="1.5">${lines.join("")}</g>
  <rect width="${AV}" height="${AV}" fill="url(#glow)"/>
  <circle cx="${AV / 2}" cy="${AV / 2}" r="${AV_RING}" fill="none"
    stroke="rgba(${ringColor}, ${ringAlpha})" stroke-width="3"/>
</svg>`;
}

async function renderAvatar(out, { light = false } = {}) {
  const seal = await sharp(LOGO)
    .trim({ threshold: 1 })
    .resize(AV_SEAL, AV_SEAL, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp(Buffer.from(avatarSvg({ light })))
    .composite([{ input: seal, left: (AV - AV_SEAL) / 2, top: (AV - AV_SEAL) / 2 }])
    .png({ compressionLevel: 9 })
    .toFile(out);

  console.log(`wrote ${out} (${AV}x${AV})`);
}

async function main() {
  await ensureFonts();
  await mkdir(join(ROOT, "public", "banners"), { recursive: true });

  // Seal, trimmed to its ink then scaled - the source PNG carries ~17% padding.
  const seal = await sharp(LOGO)
    .trim({ threshold: 1 })
    .resize(SEAL, SEAL, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const text = await sharp(Buffer.from(textSvg()))
    .trim({ threshold: 1 })
    .png()
    .toBuffer();
  const textMeta = await sharp(text).metadata();

  const contentW = SEAL + GAP + 1 + GAP + textMeta.width;
  const startX = Math.round(SAFE_X + (SAFE_W - contentW) / 2);
  if (contentW > SAFE_W) {
    console.warn(`WARNING: content is ${contentW}px, wider than the ${SAFE_W}px safe area`);
  }

  const dividerX = startX + SEAL + GAP;
  const textX = dividerX + 1 + GAP;
  const dividerH = 300;

  const divider = `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="${dividerH}"><rect width="1" height="${dividerH}" fill="rgba(${RICE}, 0.18)"/></svg>`;

  await sharp(Buffer.from(backgroundSvg()))
    .composite([
      { input: seal, left: startX, top: Math.round(SAFE_Y + (SAFE_H - SEAL) / 2) },
      { input: Buffer.from(divider), left: dividerX, top: Math.round(SAFE_Y + (SAFE_H - dividerH) / 2) },
      { input: text, left: textX, top: Math.round(SAFE_Y + (SAFE_H - textMeta.height) / 2) },
    ])
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  const meta = await sharp(OUT).metadata();
  console.log(
    `wrote ${OUT} (${meta.width}x${meta.height}); text block ${textMeta.width}x${textMeta.height}, content ${contentW}px in a ${SAFE_W}px safe area`,
  );

  await renderAvatar(OUT_AVATAR, { light: true });
  await renderAvatar(OUT_AVATAR_DARK);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
