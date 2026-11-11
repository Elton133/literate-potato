import type { LinkItem } from "@/content/site";
import styles from "./Links.module.css";

/**
 * Typographic link rows. Unconfirmed destinations (url: null) render as
 * inert text marked "Pending" — never as a guessed URL.
 */
export function Links({
  items,
  size = "md",
  className = "",
}: {
  items: LinkItem[];
  /** md/lg: ruled rows · inline: a flowing, rule-free list */
  size?: "md" | "lg" | "inline";
  className?: string;
}) {
  return (
    <ul className={`${styles.list} ${styles[size]} ${className}`}>
      {items.map((item) => (
        <li key={item.label}>
          {item.url ? (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.row}>
              <span className={styles.label}>{item.label}</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <span className={`${styles.row} ${styles.pending}`}>
              <span className={styles.label}>{item.label}</span>
              <span className={`meta ${styles.state}`}>{size === "inline" ? "Soon" : "Pending"}</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
