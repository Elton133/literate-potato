import type { CSSProperties } from "react";
import { artist, ep, featuredTrackId, photos } from "@/content/site";
import { ListenButton } from "../audio/ListenButton";
import { Plate } from "../Plate";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="top" className={`pattern ${styles.hero}`} aria-labelledby="hero-name">
      {/* The coffee slab sits behind everything — Bauhaus counterweight to the portrait */}
      {/* <div className={styles.slab} data-reveal="rise" style={{ "--d": "250ms" } as CSSProperties} aria-hidden /> */}


      {/* Portrait: enters from beyond the right edge, bleeds off-canvas and into the next section */}
      <div className={styles.portrait} data-reveal="from-right" style={{ "--d": "100ms" } as CSSProperties}>
        <Plate
          media={photos.portrait}
          label="Portrait — B/W"
          sizes="(max-width: 759px) 120vw, 64vw"
          eager
        />
        <span className={`meta ${styles.handle}`} aria-hidden>
          {artist.handle}
        </span>
      </div>

      {/* The wordmark is the name — stacked, large, in off-white. The h1 keeps
          the plain text for search engines and screen readers. */}
      <div className={styles.lockup}>
        <h1 id="hero-name" className={styles.name}>
          <span className="sr-only">{artist.name}</span>
          <span className={styles.wordmark} aria-hidden data-reveal="rise" style={{ "--d": "300ms" } as CSSProperties} />
        </h1>

        {/* never gated behind a scroll reveal — this is the page's main action */}
        <div className={styles.ctas}>
          <ListenButton trackId={featuredTrackId} label={`Listen to ${ep.title}`} className={styles.listen} />
          <a href="#music" className={styles.more}>
            All platforms
          </a>
        </div>
      </div>

      <div className={styles.caption} data-reveal="wipe" style={{ "--d": "1100ms" } as CSSProperties}>
        <p className={styles.statement}>{artist.statement}</p>
      </div>
    </section>
  );
}
