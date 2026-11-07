import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Cached so the icon prerenders at build time. */
async function stackedWordmark() {
  "use cache";
  // CRAIG over OSAE, cut from the official wordmark and recoloured off-white
  const png = await readFile(join(process.cwd(), "src/assets/wordmark-stacked-white.png"));
  return `data:image/png;base64,${png.toString("base64")}`;
}

/** Home-screen icon: the wordmark, stacked, on black with a coffee rule. */
export default async function AppleIcon() {
  const src = await stackedWordmark();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#080808",
          position: "relative",
        }}
      >
        {/* 975 × 740 source → 146 × 111 */}
        <img src={src} alt="" width={146} height={111} style={{ width: 146, height: 111, marginTop: -8 }} />
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 180, height: 10, background: "#A36552" }} />
      </div>
    ),
    size,
  );
}
