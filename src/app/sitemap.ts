import type { MetadataRoute } from "next";
import { SITE } from "@/lib/wmac-constants";

const ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" as const },
  { path: "/schedule", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/start-here", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/aikido", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/judo", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/daito-ryu", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/karate-university", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/just-move", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/instructors", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.origin}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
