"use client";

import { useState, type FormEvent } from "react";
import { artist, contact, socials } from "@/content/site";
import styles from "./sections/Contact.module.css";

type Channel = "email" | "whatsapp";

/**
 * Bookings form — reaches Craig directly, no backend needed:
 *  · "Send by email"    opens the visitor's mail app, addressed to `contact.email`
 *  · "Send on WhatsApp" opens a chat with `contact.whatsapp`, message pre-written
 * Each button appears once its value is set in src/content/site.ts.
 */
export function ContactForm() {
  const [type, setType] = useState(contact.enquiryTypes[0]);
  const [sent, setSent] = useState<Channel | null>(null);
  const instagram = socials.find((s) => s.label === "Instagram")?.url ?? null;
  const hasEmail = Boolean(contact.email);
  const hasWhatsApp = Boolean(contact.whatsapp);
  const ready = hasEmail || hasWhatsApp;

  function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel = (submitter?.value as Channel) || (hasWhatsApp ? "whatsapp" : "email");

    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const reach = String(f.get("reach") ?? "").trim();
    const when = String(f.get("when") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();
    const subject = `${type} — ${name}`;
    const body = [
      `Hello Craig,`,
      ``,
      message,
      ``,
      `— ${name}`,
      `Enquiry: ${type}`,
      when ? `Date / location: ${when}` : null,
      `Reach me at: ${reach}`,
      `(sent from craigosae.com)`,
    ]
      .filter((l) => l !== null)
      .join("\n");

    if (channel === "whatsapp" && contact.whatsapp) {
      const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(`*${subject}*\n\n${body}`)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } else if (contact.email) {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    setSent(channel);
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
          <span className="meta">Your email or phone</span>
          <input name="reach" required autoComplete="email" inputMode="email" />
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
        {ready ? (
          <span className={styles.actions}>
            {hasEmail && (
              <button type="submit" name="channel" value="email" className={styles.submit}>
                Send by email
              </button>
            )}
            {hasWhatsApp && (
              <button
                type="submit"
                name="channel"
                value="whatsapp"
                className={`${styles.submit} ${hasEmail ? styles.secondary : ""}`}
              >
                Send on WhatsApp
              </button>
            )}
          </span>
        ) : (
          <button type="submit" className={styles.submit} disabled>
            Send enquiry
          </button>
        )}

        <p className="meta" role="status">
          {!ready ? (
            <>
              Bookings inbox opening soon — message{" "}
              {instagram ? (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className={styles.inline}>
                  {artist.handle} on Instagram
                </a>
              ) : (
                artist.handle
              )}{" "}
              in the meantime.
            </>
          ) : sent === "whatsapp" ? (
            "WhatsApp should now be open with your message ready — just press send."
          ) : sent === "email" ? (
            "Your mail app should now be open with your message ready — just press send."
          ) : (
            "Your message opens ready to send — nothing is lost."
          )}
        </p>
      </div>
    </form>
  );
}
