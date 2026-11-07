import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: a black square, "CO" in off-white, a coffee bar — sharp corners. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 8px",
          background: "#080808",
          color: "#F5F3EE",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -2,
          lineHeight: 0.85,
          position: "relative",
        }}
      >
        <span>C</span>
        <span style={{ paddingLeft: 14 }}>O</span>
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 64, height: 6, background: "#A36552" }} />
      </div>
    ),
    size,
  );
}
