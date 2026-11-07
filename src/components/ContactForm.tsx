"use client";

import { useState, type FormEvent } from "react";
import { artist, contact, socials } from "@/content/site";
import styles from "./sections/Contact.module.css";

/**
 * Bookings form. With `contact.email` set it composes an email in the
 * visitor's mail app (no backend needed). Swap `send` for a form endpoint
 * (Formspree, a Server Action, etc.) when one exists.
 */
export function ContactForm() {
  const [type, setType] = useState(contact.enquiryTypes[0]);
  const [sent, setSent] = useState(false);
  const ready = Boolean(contact.email);
  const instagram = socials.find((s) => s.label === "Instagram")?.url ?? null;

  function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!contact.email) return;
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "");
    const lines = [
      `Name: ${name}`,
      `Email: ${f.get("email")}`,
      `Enquiry: ${type}`,
      f.get("when") ? `Date / location: ${f.get("when")}` : null,
      "",
      String(f.get("message") ?? ""),
    ].filter((l) => l !== null);
    const subject = `${type} — ${name}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  }

  return (
    <form className={styles.form} onSubmit={send}>
      <fieldset className={styles.types}>
        <legend className="meta">Nature of enquiry</legend>
        {contact.enquiryTypes.map((t) => (
          <label key={t} className={styles.type}>
            <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} />
            <span>{t}</span>
          </label>
        ))}
      </fieldset>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className="meta">Name</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span className="meta">Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>

      <label className={styles.field}>
        <span className="meta">Date &amp; location (if an event)</span>
        <input name="when" />
      </label>

      <label className={styles.field}>
        <span className="meta">Message</span>
        <textarea name="message" rows={4} required />
      </label>

      <div className={styles.submitRow}>
        <button type="submit" className={styles.submit} disabled={!ready}>
          <span>Send enquiry</span>
          <span aria-hidden>→</span>
        </button>
        <p className="meta" role="status">
          {!ready ? (
            <>
              Bookings inbox opening soon — message{" "}
              {instagram ? (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className={styles.inline}>
                  {artist.handle} on Instagram ↗
                </a>
              ) : (
                artist.handle
              )}{" "}
              in the meantime.
            </>
          ) : sent
              ? "Your mail app should now be open with the message ready."
              : "Opens your mail app with everything filled in."}
        </p>
      </div>
    </form>
  );
}
