import { KIOSK_PHOTOS_MANIFEST, type KioskPhoto } from "./kiosk-photos-manifest";

export type { KioskPhoto };

export function getKioskPhotos(): KioskPhoto[] {
  return KIOSK_PHOTOS_MANIFEST;
}
