import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { artist, ep } from "@/content/site";

export const alt = `${artist.name} — Ghanaian ${artist.genre} artist. Black-and-white portrait beside his name.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card: the real black-and-white portrait cropped off the
 * right edge, the name set large on black — the hero, in miniature.
 */
/** Cached so the card prerenders at build time — crawlers get a static PNG. */
async function assets() {
  "use cache";
  const [portrait, font] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/og-portrait.jpg")),
    // DM Sans (SIL OFL) — the site's typeface, bundled for the renderer
    readFile(join(process.cwd(), "src/assets/fonts/DMSans-ExtraBold.ttf")),
  ]);
  return {
    src: `data:image/jpeg;base64,${portrait.toString("base64")}`,
    font: font.toString("base64"),
  };
}

export default async function Image() {
  const { src, font } = await assets();

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#080808", color: "#F5F3EE", position: "relative", fontFamily: "DM Sans" }}>
        {/* portrait bleeding off the right edge */}
        <img
          src={src}
          alt=""
          width={603}
          height={900}
          style={{ position: "absolute", right: -70, top: -40, width: 520, height: 776, objectFit: "cover" }}
        />
        {/* coffee slab */}
        <div style={{ position: "absolute", left: 470, top: 70, width: 90, height: 230, background: "#2D0C05" }} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 56, width: 720 }}>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: 4, opacity: 0.65 }}>
            {`GHANA — ${artist.genre.toUpperCase()} — SINGER · PRODUCER`}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 172, lineHeight: 0.84, fontWeight: 800, letterSpacing: -10 }}>
            <span>CRAIG</span>
            <span style={{ paddingLeft: 60 }}>OSAE</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, gap: 24 }}>
            <span>{`Now: ${ep.title} ${ep.kind}`}</span>
            <span style={{ opacity: 0.65 }}>{artist.handle}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "DM Sans", data: Buffer.from(font, "base64"), weight: 800, style: "normal" }],
    },
  );
}
