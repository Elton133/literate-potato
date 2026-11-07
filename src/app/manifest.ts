import type { MetadataRoute } from "next";
import { artist } from "@/content/site";
import { SEO } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: artist.name,
    short_name: artist.name,
    description: SEO.description,
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    icons: [
      // The Dialogue 1 cover (app/icon.png)
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
