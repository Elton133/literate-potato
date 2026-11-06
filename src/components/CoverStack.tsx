"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Media } from "@/content/site";
import styles from "./CoverStack.module.css";

/**
 * The record's two faces — front cover and track list — stacked like cards.
 * Mouse: hover shuffles the back card forward, leaving shuffles it back.
 * Touch / keyboard: tap or press to shuffle.
 * The front card slides out past the screen edge, drops behind, and the
 * other card comes forward.
 */
export function CoverStack({ front, back, sizes }: { front: Media; back: Media; sizes: string }) {
  const [showBack, setShowBack] = useState(false);
  const [moved, setMoved] = useState(false);
  const pointer = useRef<string>("mouse");

  const shuffle = (next: boolean) => {
    setMoved(true);
    setShowBack(next);
  };

  const cards = [
    { media: front, key: "front", label: "Cover" },
    { media: back, key: "back", label: "Track list" },
  ];

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.stack}
        aria-pressed={showBack}
        aria-label={showBack ? "Showing the track list — shuffle back to the cover" : "Showing the cover — shuffle to the track list"}
        onPointerDown={(e) => (pointer.current = e.pointerType)}
        onPointerEnter={(e) => e.pointerType === "mouse" && shuffle(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && shuffle(false)}
        onClick={() => {
          // Mouse users shuffle by hovering; a click would just undo it.
          if (pointer.current !== "mouse") shuffle(!showBack);
          pointer.current = "mouse";
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            shuffle(!showBack);
          }
        }}
      >
        {cards.map((c, i) => {
          const isFront = (i === 1) === showBack;
          return (
            <span
              key={c.key}
              className={styles.card}
              data-pos={isFront ? "front" : "back"}
              data-moved={moved || undefined}
            >
              {c.media.src && (
                <Image
                  src={c.media.src}
                  alt={isFront ? c.media.alt : ""}
                  fill
                  sizes={sizes}
                  style={{ objectFit: "cover" }}
                />
              )}
            </span>
          );
        })}
      </button>

      <p className={`meta ${styles.legend}`} aria-hidden>
        <span>{showBack ? "02 / 02 — Track list" : "01 / 02 — Cover"}</span>
        <span className={styles.hintHover}>Hover to shuffle</span>
        <span className={styles.hintTap}>Tap to shuffle</span>
      </p>
    </div>
  );
}
