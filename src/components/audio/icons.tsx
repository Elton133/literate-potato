/**
 * Player glyphs — drawn on a 16-unit grid with exact geometry so they
 * stay razor-sharp at small sizes. The play triangle is equilateral and
 * nudged right of centre for optical balance (its mass sits left).
 */
const common = {
  viewBox: "0 0 16 16",
  "aria-hidden": true,
  focusable: false,
  shapeRendering: "geometricPrecision" as const,
};

export const PlayIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} {...common}>
    <path d="M3.5 1.5 L14.5 8 L3.5 14.5 Z" fill="currentColor" />
  </svg>
);

export const PauseIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} {...common}>
    <rect x="3" y="2" width="3.5" height="12" fill="currentColor" />
    <rect x="9.5" y="2" width="3.5" height="12" fill="currentColor" />
  </svg>
);

export const StepIcon = ({ dir, size = 14 }: { dir: 1 | -1; size?: number }) => (
  <svg width={size} height={size} {...common} style={{ transform: dir === -1 ? "scaleX(-1)" : undefined }}>
    <path d="M2 2 L11 8 L2 14 Z" fill="currentColor" />
    <rect x="12" y="2" width="2.5" height="12" fill="currentColor" />
  </svg>
);
