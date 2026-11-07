import type { CSSProperties } from "react";
import { artist, photos, story } from "@/content/site";
import { Lines } from "../Lines";
import { Plate } from "../Plate";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={`pattern ${styles.section}`} aria-labelledby="about-title">
      <p className={`meta ${styles.kicker}`}>
        <span>03</span> About — {artist.name}
      </p>

      <h2 id="about-title" className={`serif ${styles.quote}`}>
        <Lines lines={["It starts", "with an encounter", "with Jesus Christ."]} />
      </h2>

      <div className={styles.body}>
        <figure className={styles.figure} data-reveal="from-left">
          <Plate media={photos.about} label="Portrait — 4:5" sizes="(max-width: 759px) 90vw, 42vw" />
        </figure>

        <div className={styles.passages}>
          <article className={styles.passage} data-reveal="fade">
            <h3 className="meta">I. Encounter</h3>
            <p className={styles.big}>{story.intent}</p>
          </article>

          <article className={`${styles.passage} ${styles.sound}`} data-reveal="fade">
            <h3 className="meta">II. Sound</h3>
            <p className={`display ${styles.equation}`}>
              {story.sound.map((s, i) => (
                <span key={s}>
                  {i > 0 && <b aria-hidden>+</b>}
                  {s}
                </span>
              ))}
              <span className={styles.result}>
                <b aria-hidden>=</b>
                <em className="serif">{artist.genre}</em>
              </span>
            </p>
          </article>

          <article className={`${styles.passage} ${styles.hands}`} data-reveal="fade" style={{ "--d": "100ms" } as CSSProperties}>
            <h3 className="meta">III. Production</h3>
            <p className={`display ${styles.short}`}>His own beats.</p>
            <p>{story.production}</p>
          </article>

          <article className={`${styles.passage} ${styles.ears}`} data-reveal="fade" style={{ "--d": "200ms" } as CSSProperties}>
            <h3 className="meta">IV. Listening to</h3>
            <ul>
              {story.influences.map((n) => (
                <li key={n} className="serif">
                  {n}
                </li>
              ))}
            </ul>
            <p className={styles.earsNote}>{story.influenceNote}</p>
          </article>

          <article className={`${styles.passage} ${styles.count}`} data-reveal="fade">
            <h3 className="meta">V. Independent</h3>
            <p className={`display ${styles.figure_}`}>{story.streams}</p>
            <p>{story.independent}</p>
          </article>

          <article className={`${styles.passage} ${styles.mission}`} data-reveal="fade" style={{ "--d": "120ms" } as CSSProperties}>
            <h3 className="meta">VI. More than songs</h3>
            <p className={styles.missionText}>{story.mission}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
