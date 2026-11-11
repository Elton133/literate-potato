"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { PlayControl } from "./audio/PlayControl";
import styles from "./Header.module.css";

const NAV = [
  { href: "#music", label: "Music" },
  { href: "#about", label: "About" },
  { href: "#vision", label: "Vision" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Wayfinding: the index of the section you're reading turns coffee.
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const { href } of NAV) {
        const el = document.querySelector(href);
        if (el && el.getBoundingClientRect().top <= line) current = href;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header className={styles.header} data-scrolled={scrolled || undefined} data-open={open || undefined}>
      <a href="#top" className={styles.mark} aria-label="Craig Osae — home">
        {/* The official wordmark, painted in currentColor via a mask so it
            follows the header's colour (and its inversion over the hero). */}
        <span className={styles.wordmark} aria-hidden />
      </a>

      <nav className={styles.nav} aria-label="Primary">
        <ol>
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                data-active={active === item.href || undefined}
                aria-current={active === item.href ? "location" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

    </header>

    {/* Mobile menu — always mounted so it can animate; inert while closed */}
    <div
      id="mobile-menu"
      className={styles.sheet}
      data-open={open || undefined}
      aria-hidden={!open}
      inert={!open}
    >
      <ol>
        {NAV.map((item, i) => (
          <li key={item.href} style={{ "--i": i } as CSSProperties}>
            <a href={item.href} onClick={() => setOpen(false)}>
              <span className="display">{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
      <p className="meta">Urban Gospel — Ghana — @craigosae</p>
    </div>

    {/* Outside <header>: the header blends with the hero, the PLAY block never does */}
    <div className={styles.right}>
      <PlayControl />
      <button
        type="button"
        className={styles.menuBtn}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span key={open ? "close" : "menu"} className={`meta ${styles.menuLabel}`}>
          {open ? "Close" : "Menu"}
        </span>
      </button>
    </div>
    </>
  );
}
