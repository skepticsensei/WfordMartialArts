import type { MetadataRoute } from "next";
import { SITE } from "@/lib/wmac-constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F3EB",
    theme_color: "#B21E2B",
    icons: [
      {
        src: "/logos/Weatherford_Martial_Arts_android_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
