import type { CSSProperties } from "react";
import { ep, getTrack, otherTracks, tracks, type Track } from "@/content/site";
import { TrackList } from "../audio/TrackList";
import { CoverStack } from "../CoverStack";
import { Lines } from "../Lines";
import { Links } from "../Links";
import { Plate } from "../Plate";
import styles from "./Record.module.css";

const EP_ID = "the-dialogue-1";

/** The Dialogue 1 — a record sleeve translated into an editorial spread. */
export function Record() {
  const confirmed = ep.tracklist.map(getTrack).filter(Boolean) as Track[];
  const hasTracklist = confirmed.length > 0;
  const list = hasTracklist ? confirmed : tracks;
  const others = hasTracklist ? otherTracks(EP_ID) : [];

  const facts: [string, string][] = [
    ["Format", ep.kind],
    ["Tracks", hasTracklist ? String(confirmed.length) : "To be confirmed"],
    ["Status", ep.status],
    ["Released", ep.release.date ?? "To be confirmed"],
  ];

  return (
    <section id="music" className={styles.section} aria-labelledby="record-title">
      <p className={`meta ${styles.kicker}`}>
        <span>02</span> Music — The current record
      </p>

      <div className={styles.spread}>
        <div className={styles.sleeve} data-reveal="from-left">
          {ep.artwork.src && ep.artworkBack.src ? (
            <CoverStack front={ep.artwork} back={ep.artworkBack} sizes="(max-width: 759px) 100vw, 50vw" />
          ) : (
            <div className={styles.single}>
              <Plate media={ep.artwork} label="Artwork" sizes="(max-width: 759px) 100vw, 50vw" />
            </div>
          )}
        </div>

        <div className={styles.copy}>
          <h2 id="record-title" className={`display ${styles.title}`}>
            <Lines lines={["The", "Dialogue"]} />
            <span className="sr-only"> 1</span>
          </h2>
          <span className={`display ${styles.numeral}`} aria-hidden data-reveal="rise" style={{ "--d": "300ms" } as CSSProperties}>
            1
          </span>

          <div className={styles.notes} data-reveal="fade" style={{ "--d": "200ms" } as CSSProperties}>
            <div className={styles.desc}>
              {ep.description.map((p, i) => (
                <p key={i} className={i === 0 ? styles.lede : undefined}>
                  {p}
                </p>
              ))}
            </div>
            <dl className={styles.facts}>
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="meta">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className={styles.lower}>
        <div className={styles.tracks} data-reveal="fade">
          <div className={styles.listHead}>
            <h3 className="meta">{hasTracklist ? `${ep.title} — Track list` : "Selected songs"}</h3>
            {!hasTracklist && <p className="meta">Official EP tracklist to be announced</p>}
          </div>
          <TrackList items={list} />

          {others.length > 0 && (
            <div className={styles.others}>
              <div className={styles.listHead}>
                <h3 className="meta">Also by Craig Osae</h3>
              </div>
              <TrackList items={others} size="sm" />
            </div>
          )}
        </div>

        <aside className={styles.stream} data-reveal="fade" style={{ "--d": "150ms" } as CSSProperties}>
          <h3 className="meta">Stream {ep.title}</h3>
          <Links items={ep.links} />
        </aside>
      </div>
    </section>
  );
}
