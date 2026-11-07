import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata = { title: "Off the record" };

/** A missing page, in the site's own voice. */
export default function NotFound() {
  return (
    <section className={styles.page}>
      <p className="meta">404 — Not on the tracklist</p>
      <h1 className={`display ${styles.title}`}>
        Off the
        <br />
        record.
      </h1>
      <p className={styles.note}>
        This page doesn’t exist — or it hasn’t been released yet.
      </p>
      <Link href="/" className={styles.back}>
        <span>Da capo</span>
        <span className="meta">Back to the start →</span>
      </Link>
    </section>
  );
}
