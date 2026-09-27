/**
 * Downloads the two brand faces once into .cache/fonts (gitignored) and points
 * fontconfig at them, so sharp's SVG renderer can find them. This box has no
 * system fonts; sharp itself comes in with Next's image optimizer.
 *
 * Shared by scripts/generate-youtube-art.mjs and
 * scripts/generate-opening-card.mjs - both draw the same brand.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const FONTS = {
  "Inter[opsz,wght].ttf": "ofl/inter/Inter%5Bopsz,wght%5D.ttf",
  "Inter-Italic[opsz,wght].ttf": "ofl/inter/Inter-Italic%5Bopsz,wght%5D.ttf",
  "NotoSerifJP[wght].ttf": "ofl/notoserifjp/NotoSerifJP%5Bwght%5D.ttf",
};

export const SERIF = "Noto Serif JP";
export const SANS = "Inter";

export async function ensureFonts(root = process.cwd()) {
  const fontDir = join(root, ".cache", "fonts");
  await mkdir(fontDir, { recursive: true });

  for (const [name, path] of Object.entries(FONTS)) {
    const dest = join(fontDir, name);
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

  const conf = join(root, ".cache", "fonts.conf");
  await writeFile(
    conf,
    `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${fontDir}</dir>
  <cachedir>${join(root, ".cache", "fontconfig")}</cachedir>
</fontconfig>
`,
  );
  process.env.FONTCONFIG_FILE = conf;
}
