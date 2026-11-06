import { ImageResponse } from "next/og";
import { artist, ep } from "@/content/site";

export const alt = `${artist.name} — ${artist.genre}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Typographic share card — no photograph is implied or invented. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#080808",
          color: "#F5F3EE",
          position: "relative",
          padding: 56,
        }}
      >
        <div style={{ position: "absolute", right: 0, top: 0, width: 360, height: 630, background: "#2D0C05" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, opacity: 0.7 }}>
            {`${artist.country.toUpperCase()} — ${artist.genre.toUpperCase()} — ${artist.roles.join(" / ").toUpperCase()}`}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 190, lineHeight: 0.84, fontWeight: 700, letterSpacing: -6 }}>
            <span>CRAIG</span>
            <span style={{ paddingLeft: 120 }}>OSAE</span>
          </div>
          <div style={{ display: "flex", fontSize: 26 }}>{`Now: ${ep.title} ${ep.kind}  ·  ${artist.handle}`}</div>
        </div>
      </div>
    ),
    size,
  );
}
