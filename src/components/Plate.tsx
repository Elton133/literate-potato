import Image from "next/image";
import type { Media } from "@/content/site";
import styles from "./Plate.module.css";

/**
 * A photographic plate. Renders the real image when `media.src` is set;
 * otherwise a clearly-labelled pending plate that holds the composition
 * without pretending to be a photograph.
 *
 * The parent controls size and position — Plate always fills it.
 */
export function Plate({
  media,
  sizes,
  label,
  tone = "dark",
  eager = false,
  className = "",
}: {
  media: Media;
  sizes: string;
  /** Short caption for the pending state, e.g. "Portrait — B/W". */
  label: string;
  tone?: "dark" | "light" | "coffee";
  eager?: boolean;
  className?: string;
}) {
  if (media.src) {
    return (
      <div className={`${styles.plate} ${className}`}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          preload={eager}
          loading={eager ? undefined : "lazy"}
          style={{ objectFit: "cover", objectPosition: media.focus ?? "50% 50%" }}
        />
      </div>
    );
  }

  return (
    <div
      className={`${styles.plate} ${styles.pending} ${styles[tone]} ${className}`}
      role="img"
      aria-label={`${media.alt} — photograph to be added`}
    >
      <span className={`meta ${styles.caption}`} aria-hidden>
        <span>{label}</span>
        <span>Photograph pending</span>
      </span>
    </div>
  );
}
