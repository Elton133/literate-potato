import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Renders each line inside a clipping mask so it can rise into view.
 * Pass an array of lines (strings or nodes); the parent decides the type.
 */
export function Lines({
  lines,
  as: Tag = "span",
  className,
  delay = 0,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  return (
    <Tag className={className} data-reveal="lines" style={{ "--d": `${delay}ms` } as CSSProperties}>
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <span style={{ "--i": i } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
