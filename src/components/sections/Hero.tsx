import type { CSSProperties } from "react";
import { artist, ep, photos } from "@/content/site";
import { Lines } from "../Lines";
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

      <h1 id="hero-name" className={`display ${styles.name}`}>
        <Lines lines={["Craig", "Osae"]} delay={350} className={styles.nameLines} />
      </h1>

      <div className={styles.caption} data-reveal="wipe" style={{ "--d": "1100ms" } as CSSProperties}>
        <p className={styles.statement}>{artist.statement}</p>
        <a href="#music" className={styles.current}>
          <span className="meta">Now</span>
          <span>
            {ep.title} <em>{ep.kind}</em>
          </span>
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
