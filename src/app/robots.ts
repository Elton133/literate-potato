import type { MetadataRoute } from "next";
import { artist } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${artist.siteUrl}/sitemap.xml`,
  };
}
