import type { CSSProperties } from "react";
import { collaborations, performances } from "@/content/site";
import { Lines } from "../Lines";
import styles from "./Stage.module.css";

/** Performances set like a printed concert bill; collaborations as a credit line. */
export function Stage() {
  return (
    <section id="stage" className={styles.section} aria-labelledby="stage-title">
      <header className={styles.head}>
        <p className="meta">
          <span>06</span> Stage &amp; studio
        </p>
        <h2 id="stage-title" className={`display ${styles.title}`}>
          <Lines lines={["On", "stage"]} />
        </h2>
        <p className={`serif ${styles.aside}`} data-reveal="fade">
          Rooms he has carried the sound into.
        </p>
      </header>

      <ol className={styles.bill}>
        {performances.map((p, i) => (
          <li
            key={p.name}
            className={styles.act}
            data-reveal="wipe"
            style={{ "--d": `${i * 90}ms` } as CSSProperties}
          >
            <span className={`meta ${styles.n}`}>{String(i + 1).padStart(2, "0")}</span>
            <span className={`display ${styles.name}`}>{p.name}</span>
            <span className={`meta ${styles.year}`}>{p.year ?? "—"}</span>
          </li>
        ))}
      </ol>

      <div className={styles.collab} data-reveal="fade">
        <h3 className="meta">In the studio with</h3>
        <ul>
          {collaborations.map((c) => (
            <li key={c.name}>
              <span className="serif">{c.name}</span>
              {c.note && <span className="meta">{c.note}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
