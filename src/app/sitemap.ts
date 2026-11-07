import type { MetadataRoute } from "next";
import { abs, sitemapImages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: abs("/"),
      changeFrequency: "monthly",
      priority: 1,
      // Image sitemap: helps the photographs and EP cover show in image search.
      images: sitemapImages(),
    },
  ];
}
