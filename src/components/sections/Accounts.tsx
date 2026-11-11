import { artist, socials, streaming } from "@/content/site";
import { Links } from "../Links";
import styles from "./Accounts.module.css";

/** Official accounts — compact: one handle, two rows of platforms. */
export function Accounts() {
  return (
    <section id="accounts" className={styles.section} aria-labelledby="accounts-title">
      <div className={styles.head}>
        <p className="meta">Official accounts — one handle, everywhere</p>
        <h2 id="accounts-title" className={`display ${styles.handle}`} data-reveal="rise">
          <span className={styles.at}>@</span>craigosae
        </h2>
      </div>

      <div className={styles.cols} data-reveal="fade">
        <div>
          <h3 className="meta">Follow</h3>
          <Links items={socials} size="inline" />
        </div>
        <div>
          <h3 className="meta">Listen</h3>
          <Links items={streaming} size="inline" />
        </div>
        <p className={`meta ${styles.note}`}>{artist.handle} — the only accounts listed here are official.</p>
      </div>
    </section>
  );
}
