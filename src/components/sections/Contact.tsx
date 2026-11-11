import { artist, contact } from "@/content/site";
import { ContactForm } from "../ContactForm";
import { Lines } from "../Lines";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contact" className={`pattern ${styles.section}`} aria-labelledby="contact-title">
      <div className={styles.left}>
        <p className={`meta ${styles.kicker}`}>
          <span>08</span> Contact — bookings, collaborations, press
        </p>
        <h2 id="contact-title" className={`display ${styles.title}`}>
          <Lines lines={["Write", "to", "Craig."]} />
        </h2>
        {contact.email && (
          <a className={styles.mail} href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        )}
      </div>
      <div className={styles.right} data-reveal="fade">
        <ContactForm />
      </div>

      <footer className={styles.footer}>
        <div className={`meta ${styles.colophon}`}>
          <span>© {artist.name}</span>
          <span>
            {artist.genre} — {artist.country}
          </span>
        </div>
        {/* The wordmark is cropped by the bottom of the page */}
        <p className={`display ${styles.wordmark}`} aria-hidden>
          Craig Osae
        </p>
      </footer>
    </section>
  );
}
