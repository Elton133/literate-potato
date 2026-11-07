"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { artist, vision } from "@/content/site";
import styles from "./Vision.module.css";

/**
 * The manifesto, read aloud by the scroll. The statement is pinned on
 * screen in pale grey; each word lights up as the visitor scrolls, and
 * Craig's signature lands once the sentence is complete.
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
          <span className={`meta ${styles.index}`}>04</span>
          <h2 id="vision-title" className={`display ${styles.heading}`}>
            Vision
          </h2>
          <span className={`script ${styles.tag}`}>a manifesto</span>
        </div>

        <figure className={styles.figure}>
          <blockquote className={styles.quote}>
            <span className="sr-only">{vision.quote}</span>
            <span aria-hidden>
              <span className={styles.mark}>“</span>
              {WORDS.map(({ w, em }, i) => (
                <span
                  key={i}
                  className={`${styles.word} ${em ? styles.em : ""}`}
                  style={{ "--i": i } as CSSProperties}
                >
                  {w}{" "}
                </span>
              ))}
            </span>
          </blockquote>
          <figcaption className={styles.sign}>
            <span className={`script ${styles.signed}`}>{artist.name}</span>
            <span className="meta">On the vision</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
