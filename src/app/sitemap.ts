import type { MetadataRoute } from "next";
import { artist } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: artist.siteUrl, changeFrequency: "monthly", priority: 1 }];
}
