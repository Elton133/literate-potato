"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { PlayControl } from "./audio/PlayControl";
import styles from "./Header.module.css";

/** `n` mirrors each section's editorial index, like a contents page. */
const NAV = [
  { href: "#music", label: "Music", n: "02" },
  { href: "#about", label: "About", n: "03" },
  { href: "#vision", label: "Vision", n: "04" },
  { href: "#contact", label: "Contact", n: "08" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        <span>Craig</span>
        <span>Osae</span>
      </a>

      <nav className={styles.nav} aria-label="Primary">
        <ol>
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href}>
                <span className="meta">{item.n}</span>
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
              <span className="meta">{item.n}</span>
              <span className="display">{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
      <p className="meta">Afrogospel — Ghana — @craigosae</p>
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
