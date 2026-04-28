import type { MetadataRoute } from "next";
import { SITE } from "@/lib/wmac-constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/kiosk", "/kiosk/"],
    },
    sitemap: `${SITE.origin}/sitemap.xml`,
    host: SITE.origin,
  };
}
