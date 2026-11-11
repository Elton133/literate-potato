"use client";

import { fullSongLink, type Track } from "@/content/site";
import { useAudio, useProgress } from "./AudioProvider";
import { PauseIcon, PlayIcon } from "./icons";
import styles from "./TrackList.module.css";

/**
 * Track rows without rules: a coffee index, the title large, a quiet
 * credit line, and a solid square play key. Rhythm comes from spacing.
 */
export function TrackList({ items, size = "md" }: { items: Track[]; size?: "md" | "sm" }) {
  const { track: current, isPlaying, toggle, engaged } = useAudio();
  const { current: t, duration } = useProgress();

  return (
    <ol className={`${styles.list} ${size === "sm" ? styles.sm : ""}`}>
      {items.map((track, i) => {
        const active = engaged && current?.id === track.id;
        const playing = active && isPlaying;
        const full = fullSongLink(track);
        // Only what's different about this song — Craig is implied.
        const credit = [
          track.artist ?? null,
          track.with ? `with ${track.with}` : null,
          track.featuring ? `feat. ${track.featuring}` : null,
          track.project ? null : track.year,
        ].filter(Boolean);

        return (
          <li key={track.id} className={styles.row} data-active={active || undefined}>
            <span className={styles.idx} aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className={styles.body}>
              <span className={styles.title}>{track.title}</span>
              <span className={styles.credit}>
                {credit.join("  ·  ")}
                {full?.url && (
                  <>
                    {credit.length ? "  ·  " : ""}
                    <a className={styles.full} href={full.url} target="_blank" rel="noopener noreferrer">
                      Full song on {full.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </>
                )}
              </span>
              {active && duration > 0 && (
                <span className={styles.bar} aria-hidden>
                  <span style={{ transform: `scaleX(${t / duration})` }} />
                </span>
              )}
            </span>

            <button
              type="button"
              className={styles.play}
              onClick={() => toggle(track.id)}
              aria-label={`${playing ? "Pause" : "Play"} ${track.title}${track.artist ? ` by ${track.artist}` : ""}`}
              aria-pressed={playing}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
