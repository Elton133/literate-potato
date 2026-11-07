"use client";

import { artist, trackLabel } from "@/content/site";
import { formatTime, useAudio, useProgress } from "./AudioProvider";
import { PauseIcon, PlayIcon } from "./icons";
import styles from "./PlayControl.module.css";

/**
 * The signature PLAY block in the header. Idle it is a single sharp
 * off-white slab; once playback begins it extends into a live strip:
 * state, track title, elapsed time and a hairline of progress.
 */
export function PlayControl() {
  const { track, status, engaged, isPlaying, toggle } = useAudio();
  const { current, duration } = useProgress();
  if (!track) return null;

  const pct = duration ? (current / duration) * 100 : 0;
  const label = trackLabel(track);
  const state = isPlaying ? "playing" : engaged ? "engaged" : "idle";

  return (
    <button
      type="button"
      className={styles.control}
      data-state={state}
      onClick={() => toggle()}
      aria-label={`${isPlaying ? "Pause" : "Play"} ${label} by ${artist.name}`}
      aria-pressed={isPlaying}
      title={`${isPlaying ? "Pause" : "Play"} (K)`}
    >
      <span className={styles.key}>
        <span className={styles.icon}>{isPlaying ? <PauseIcon /> : <PlayIcon />}</span>
        <span className={styles.word}>{isPlaying ? "Pause" : "Play"}</span>
      </span>

      <span className={styles.now} aria-hidden={!engaged}>
        <span className={styles.title}>{track.title}</span>
        <span className={`meta ${styles.time}`}>
          {status === "unavailable"
            ? "Soon"
            : status === "error"
              ? "Offline"
              : status === "loading"
                ? "···"
                : formatTime(current)}
        </span>
      </span>

      <span className={styles.progress} aria-hidden>
        <span style={{ transform: `scaleX(${pct / 100})` }} />
      </span>
    </button>
  );
}
