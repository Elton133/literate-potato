import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    qualities: [75, 85],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      // Tailwind only for global stylesheets. No `as` rename: renaming
      // turned *.module.css into plain CSS and broke every CSS Module.
      "*.css": {
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
      },
    },
  },
};

export default nextConfig;
