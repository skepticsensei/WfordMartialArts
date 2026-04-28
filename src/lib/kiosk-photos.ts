import { readdirSync } from "node:fs";
import { join } from "node:path";

export type KioskPhoto = {
  src: string;
  alt: string;
};

const PHOTO_EXT = /\.(jpe?g|png|webp|avif)$/i;

export function getKioskPhotos(): KioskPhoto[] {
  const dir = join(process.cwd(), "public", "kiosk-photos");
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return [];
  }

  return entries
    .filter((name) => PHOTO_EXT.test(name))
    .sort()
    .map((name) => ({
      src: `/kiosk-photos/${name}`,
      alt: name.replace(PHOTO_EXT, "").replace(/[-_]+/g, " ").trim(),
    }));
}
