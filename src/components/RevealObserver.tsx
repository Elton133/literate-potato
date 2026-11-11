"use client";

import { useEffect } from "react";

/**
 * Marks [data-reveal] elements with data-in once they scroll into view.
 *
 * Uses getBoundingClientRect rather than IntersectionObserver: the hidden
 * start states use clip-path, and IntersectionObserver treats a fully
 * clipped element as zero-area — so it would never fire.
 *
 * Rendered at the end of the page so its effect runs only after every
 * section has hydrated (attributes added earlier cause hydration errors).
 */
export function RevealObserver() {
  useEffect(() => {
    let pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])"));
    let frame = 0;

    const check = () => {
      frame = 0;
      // anything whose top is on screen reveals (a 4% margin avoids
      // triggering on a sliver at the very bottom edge)
      const limit = window.innerHeight * 0.96;
      pending = pending.filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < limit && r.bottom > 0) {
          el.setAttribute("data-in", "");
          return false;
        }
        return true;
      });
      if (!pending.length) stop();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const stop = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      stop();
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

/** Inline, pre-paint: enables motion start-states only when JS is running. */
export const motionScript = `document.documentElement.classList.add('motion')`;
