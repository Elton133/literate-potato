"use client";

import type { Track } from "@/content/site";
import { useAudio, useProgress } from "./AudioProvider";
import { PauseIcon, PlayIcon } from "./icons";
import styles from "./TrackList.module.css";

export function TrackList({ items, size = "md" }: { items: Track[]; size?: "md" | "sm" }) {
  const { track: current, isPlaying, toggle, engaged } = useAudio();
  const { current: t, duration } = useProgress();

  return (
    <ol className={`${styles.list} ${size === "sm" ? styles.sm : ""}`}>
      {items.map((track, i) => {
        const active = engaged && current?.id === track.id;
        const playing = active && isPlaying;
        return (
          <li key={track.id} className={styles.row} data-active={active || undefined}>
            <button
              type="button"
              className={styles.play}
              onClick={() => toggle(track.id)}
              aria-label={`${playing ? "Pause" : "Play"} ${track.title}${track.artist ? ` by ${track.artist}` : ""}`}
              aria-pressed={playing}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <span className={`meta ${styles.idx}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={styles.title}>
              {track.title}
              {track.featuring && <em> feat. {track.featuring}</em>}
              {track.artist && <em> — {track.artist}</em>}
            </span>
            <span className={`meta ${styles.status}`}>
              {track.audio ? (track.year ?? "") : "Audio pending"}
            </span>
            {active && duration > 0 && (
              <span className={styles.bar} aria-hidden style={{ transform: `scaleX(${t / duration})` }} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
