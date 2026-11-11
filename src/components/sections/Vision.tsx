"use client";

import { useEffect, useRef, type ClipboardEvent, type CSSProperties } from "react";
import { artist, vision } from "@/content/site";
import styles from "./Vision.module.css";

/**
 * The manifesto, read aloud by the scroll. The statement is pinned on
 * screen in pale grey; each word lights up as the visitor scrolls, and
 * the attribution lands once the sentence is complete.
 *
 * The words are Craig's, verbatim (see `vision.quote`). Only the two
 * emphasised phrases are art direction.
 */
const PHRASES: { text: string; em?: boolean }[] = [
  { text: "Changing the Ghanaian urban gospel scene to give room for" },
  { text: "different sounds", em: true },
  { text: "and art in general, and to make young people know there’s" },
  { text: "hope for the future.", em: true },
];

const WORDS = PHRASES.flatMap((p) => p.text.split(" ").map((w) => ({ w, em: p.em })));
const N = WORDS.length;

/**
 * Copying any part of the statement carries Craig's name with it — in
 * his own casing (the screen shows it uppercase, the clipboard shouldn't).
 */
function creditOnCopy(e: ClipboardEvent<HTMLQuoteElement>) {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed) return;
  const picked = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("[data-i]"))
    .filter((el) => sel.containsNode(el, true))
    .map((el) => WORDS[Number(el.dataset.i)].w);
  if (!picked.length) return;
  e.preventDefault();
  e.clipboardData.setData("text/plain", `“${picked.join(" ")}”\n— ${artist.name}, craigosae.com`);
}

export function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    // Reduced motion: show the whole statement, no scroll-reading.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pin.style.setProperty("--lit", String(N + 2));
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const r = section.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const progress = travel > 0 ? Math.min(Math.max(-r.top / travel, 0), 1) : 1;
      // A small lead so the first words are already lit when it pins,
      // and a small tail so the last word completes before release.
      pin.style.setProperty("--lit", (1 + progress * (N + 1)).toFixed(2));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} id="vision" className={styles.section} aria-labelledby="vision-title">
      <div ref={pinRef} className={styles.pin} style={{ "--n": N } as CSSProperties}>
        <div className={styles.head}>
          <h2 id="vision-title" className={`display ${styles.heading}`}>
            Vision
          </h2>
          <span className={`meta ${styles.tag}`}>A manifesto</span>
        </div>

        <figure className={styles.figure}>
          <blockquote className={styles.quote} onCopy={creditOnCopy}>
            <span className="sr-only">{vision.quote}</span>
            <span aria-hidden>
              <span className={styles.mark}>“</span>
              {WORDS.map(({ w, em }, i) => (
                <span
                  key={i}
                  data-i={i}
                  className={`${styles.word} ${em ? styles.em : ""}`}
                  style={{ "--i": i } as CSSProperties}
                >
                  {w}{" "}
                </span>
              ))}
              {/* the quote only closes once the whole sentence has been read */}
              <span className={styles.closeMark}>”</span>
            </span>
          </blockquote>
          <figcaption className={styles.sign}>
            <span className={styles.signed}>— {artist.name}</span>
            <span className="meta">On the vision</span>
          </figcaption>
          {/* where the sound goes next — lands with the sign-off */}
          <p className={styles.reach}>
            <span className="meta">Next</span>
            {vision.reach}
          </p>
        </figure>
      </div>
    </section>
  );
}
