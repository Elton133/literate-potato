import type { CSSProperties } from "react";
import { photos } from "@/content/site";
import { Plate } from "../Plate";
import styles from "./Media.module.css";

const LAYOUT = ["a", "b", "c", "d"] as const;
const REVEAL = ["from-right", "rise", "fade", "from-left"] as const;
const TONES = ["dark", "light", "dark", "coffee"] as const;
const SIZES = ["(max-width: 759px) 110vw, 72vw", "(max-width: 759px) 70vw, 28vw", "(max-width: 759px) 80vw, 34vw", "(max-width: 759px) 110vw, 70vw"];

export function Media() {
  return (
    <section id="media" className={`pattern ${styles.section}`} aria-labelledby="media-title">
      <div className={styles.label}>
        <p className="meta">
          Live &amp; studio
        </p>
        <h2 id="media-title" className={`display ${styles.title}`} data-reveal="rise">
          Gallery
        </h2>
      </div>

      <p className={`meta ${styles.swipe}`} aria-hidden>
        <span>{photos.gallery.length} photographs</span>
        <span>Swipe</span>
      </p>

      <div className={styles.plates}>
        {photos.gallery.map((m, i) => {
          const k = i % 4;
          return (
            <figure
              key={i}
              className={`${styles.plate} ${styles[LAYOUT[k]]}`}
              data-reveal={REVEAL[k]}
              style={{ "--d": `${(i % 4) * 80}ms` } as CSSProperties}
            >
              <div className={styles.frame}>
                <Plate media={m} label={m.caption ?? "Photograph"} tone={TONES[k]} sizes={SIZES[k]} />
              </div>
              <figcaption className="meta">
                <span>{m.caption ?? "Craig Osae"}</span>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {m.credit && <span>© {m.credit}</span>}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
