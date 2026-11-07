import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon — the favicon's monogram at full size. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 34px",
          background: "#080808",
          color: "#F5F3EE",
          fontSize: 92,
          fontWeight: 700,
          letterSpacing: -5,
          lineHeight: 0.85,
          position: "relative",
        }}
      >
        <span>C</span>
        <span style={{ paddingLeft: 40 }}>O</span>
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 180, height: 14, background: "#A36552" }} />
      </div>
    ),
    size,
  );
}
