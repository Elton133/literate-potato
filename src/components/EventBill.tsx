"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Performance } from "@/content/site";
import styles from "./EventBill.module.css";

/**
 * The concert bill. Each night with photos opens a full-screen viewer;
 * nights without photos stay a plain line until pictures are added
 * (see `performances` in src/content/site.ts).
 */
export function EventBill({ items }: { items: Performance[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Performance | null>(null);
  const [index, setIndex] = useState(0);

  const show = (p: Performance) => {
    setOpen(p);
    setIndex(0);
  };
  const close = useCallback(() => dialogRef.current?.close(), []);

  // Open the native modal once the event is chosen; lock page scroll behind it.
  useEffect(() => {
    const d = dialogRef.current;
    if (!open || !d) return;
    d.showModal();
    stripRef.current?.scrollTo({ left: 0 });
    document.documentElement.style.overflow = "hidden";
    const onClose = () => {
      document.documentElement.style.overflow = "";
      setOpen(null);
    };
    d.addEventListener("close", onClose, { once: true });
    return () => d.removeEventListener("close", onClose);
  }, [open]);

  // Keep the counter in step with the swipe/scroll position.
  const onScroll = () => {
    const strip = stripRef.current;
    if (!strip) return;
    const slides = Array.from(strip.children) as HTMLElement[];
    const mid = strip.scrollLeft + strip.clientWidth / 2;
    const i = slides.findIndex((el) => el.offsetLeft <= mid && el.offsetLeft + el.offsetWidth > mid);
    if (i > -1 && i !== index) setIndex(i);
  };

  const go = (dir: 1 | -1) => {
    const strip = stripRef.current;
    if (!strip || !open) return;
    const next = Math.min(Math.max(index + dir, 0), open.photos.length - 1);
    const el = strip.children[next] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <>
      <ol className={styles.bill}>
        {items.map((p, i) => {
          const count = p.photos.length;
          const inner = (
            <>
              <span className={`meta ${styles.n}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className={`display ${styles.name}`}>{p.name}</span>
              <span className={styles.side}>
                <span className={`meta ${styles.year}`}>{p.year ?? "—"}</span>
                {count > 0 && (
                  <span className={`meta ${styles.view}`}>
                    View photos · {count}
                  </span>
                )}
              </span>
            </>
          );
          return (
            <li key={p.id} className={styles.act} data-reveal="wipe" style={{ "--d": `${i * 90}ms` } as CSSProperties}>
              {count > 0 ? (
                <button
                  type="button"
                  className={styles.row}
                  onClick={() => show(p)}
                  aria-haspopup="dialog"
                  aria-label={`${p.name}${p.year ? ` ${p.year}` : ""} — view ${count} photo${count > 1 ? "s" : ""}`}
                >
                  {inner}
                </button>
              ) : (
                <div className={styles.row}>{inner}</div>
              )}
            </li>
          );
        })}
      </ol>

      <dialog
        ref={dialogRef}
        className={`pattern ${styles.viewer}`}
        aria-labelledby="event-viewer-title"
        onClick={(e) => {
          // a click on the dark surround (not a photo or control) closes it
          if (e.target === e.currentTarget) close();
        }}
      >
        {open && (
          <div className={styles.frame}>
            <header className={styles.top}>
              <div>
                <p className="meta">On stage{open.year ? ` — ${open.year}` : ""}</p>
                <h3 id="event-viewer-title" className={`display ${styles.vTitle}`}>
                  {open.name}
                </h3>
              </div>
              <button type="button" className={`meta ${styles.close}`} onClick={close}>
                Close
              </button>
            </header>

            <div ref={stripRef} className={styles.strip} onScroll={onScroll}>
              {open.photos.map((ph, i) => (
                <figure key={ph.src ?? i} className={styles.slide}>
                  {ph.src && (
                    <Image
                      src={ph.src}
                      alt={ph.alt}
                      width={ph.width ?? 1200}
                      height={ph.height ?? 800}
                      sizes="(max-width: 759px) 86vw, 60vw"
                      className={styles.img}
                    />
                  )}
                </figure>
              ))}
            </div>

            <footer className={styles.bottom}>
              <span className="meta" aria-live="polite">
                {String(index + 1).padStart(2, "0")} / {String(open.photos.length).padStart(2, "0")}
              </span>
              {open.photos.length > 1 && (
                <span className={styles.nav}>
                  <button type="button" className="meta" onClick={() => go(-1)} disabled={index === 0}>
                    Previous
                  </button>
                  <button
                    type="button"
                    className="meta"
                    onClick={() => go(1)}
                    disabled={index === open.photos.length - 1}
                  >
                    Next
                  </button>
                </span>
              )}
            </footer>
          </div>
        )}
      </dialog>
    </>
  );
}
