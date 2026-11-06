import { artist, socials, streaming } from "@/content/site";
import { Links } from "../Links";
import styles from "./Accounts.module.css";

export function Accounts() {
  return (
    <section id="accounts" className={styles.section} aria-labelledby="accounts-title">
      <p className={`meta ${styles.kicker}`}>
        <span>07</span> Official accounts — one handle, everywhere
      </p>

      {/* The handle runs off the right edge on purpose */}
      <h2 id="accounts-title" className={`display ${styles.handle}`} data-reveal="from-right">
        <span className={styles.at}>@</span>craigosae
      </h2>

      <div className={styles.cols}>
        <div data-reveal="fade">
          <h3 className="meta">Follow</h3>
          <Links items={socials} size="lg" />
        </div>
        <div data-reveal="fade">
          <h3 className="meta">Listen</h3>
          <Links items={streaming} size="lg" />
        </div>
      </div>

      <p className={`meta ${styles.note}`}>
        {artist.handle} — the only accounts listed here are official.
      </p>
    </section>
  );
}
