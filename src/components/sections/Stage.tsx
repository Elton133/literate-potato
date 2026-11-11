import { collaborations, performances } from "@/content/site";
import { EventBill } from "../EventBill";
import { Lines } from "../Lines";
import styles from "./Stage.module.css";

/** Performances set like a printed concert bill; collaborations as a credit line. */
export function Stage() {
  return (
    <section id="stage" className={styles.section} aria-labelledby="stage-title">
      <header className={styles.head}>
        <p className="meta">
          Stage &amp; studio
        </p>
        <h2 id="stage-title" className={`display ${styles.title}`}>
          <Lines lines={["On", "stage"]} />
        </h2>
        <p className={`serif ${styles.aside}`} data-reveal="fade">
          Rooms he has carried the sound into.
        </p>
      </header>

      <EventBill items={performances} />

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
