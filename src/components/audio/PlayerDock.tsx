"use client";

import { artist, fullSongLink } from "@/content/site";
import { formatTime, useAudio, useProgress } from "./AudioProvider";
import { PauseIcon, PlayIcon, StepIcon } from "./icons";
import styles from "./PlayerDock.module.css";

/** Compact persistent player — slides up once the listener has pressed play. */
export function PlayerDock() {
  const { track, status, engaged, isPlaying, toggle, next, prev, seek, dismiss } = useAudio();
  const { current, duration } = useProgress();
  if (!track) return null;

  const pct = duration ? current / duration : 0;
  const unavailable = status === "unavailable" || status === "error";
  const full = fullSongLink(track);
  const previewEnded = status === "ended" && track.preview;

  return (
    <aside
      className={styles.dock}
      data-open={engaged || undefined}
      aria-label="Audio player"
      aria-hidden={!engaged}
      inert={!engaged}
    >
      <div className={styles.controls}>
        <button type="button" className={styles.btn} onClick={prev} aria-label="Previous track">
          <StepIcon dir={-1} />
        </button>
        <button
          type="button"
          className={`${styles.btn} ${styles.main}`}
          onClick={() => toggle()}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
        </button>
        <button type="button" className={styles.btn} onClick={next} aria-label="Next track">
          <StepIcon dir={1} />
        </button>
      </div>

      <div className={styles.body}>
        <p className={styles.line} aria-live="polite">
          <span className={styles.title}>{track.title}</span>
          <span className={`meta ${styles.by}`}>
            {artist.name}
            {track.with ? ` & ${track.with}` : ""}
          </span>
          {track.preview &&
            (full?.url ? (
              <a
                className={`meta ${styles.badge}`}
                href={full.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`This is a 30-second preview — hear the full song on ${full.label}`}
              >
                Full song
              </a>
            ) : (
              <span className={`meta ${styles.badge}`}>Preview</span>
            ))}
        </p>

        {previewEnded ? (
          <p className={`meta ${styles.note}`}>
            That was a preview.{" "}
            {full?.url ? (
              <a href={full.url} target="_blank" rel="noopener noreferrer">
                Hear the full song on {full.label}
              </a>
            ) : (
              <a href="#music">Hear the full song</a>
            )}
          </p>
        ) : unavailable ? (
          <p className={`meta ${styles.note}`}>
            {status === "error" ? "Audio could not load. " : "No preview on this site. "}
            {full?.url ? (
              <a href={full.url} target="_blank" rel="noopener noreferrer">
                Listen on {full.label}
              </a>
            ) : (
              <a href="#accounts">Find it on streaming</a>
            )}
          </p>
        ) : (
          <div className={styles.seekRow}>
            <span className={`meta ${styles.time}`}>{formatTime(current)}</span>
            <input
              type="range"
              className={styles.seek}
              min={0}
              max={1000}
              value={Math.round(pct * 1000)}
              onChange={(e) => seek(Number(e.target.value) / 1000)}
              aria-label="Seek"
              aria-valuetext={`${formatTime(current)} of ${formatTime(duration)}`}
              style={{ "--p": `${pct * 100}%` } as React.CSSProperties}
            />
            <span className={`meta ${styles.time}`}>{formatTime(duration)}</span>
          </div>
        )}
      </div>

      <button type="button" className={`${styles.btn} ${styles.close}`} onClick={dismiss} aria-label="Close player">
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
          <path d="M1 1 L11 11 M11 1 L1 11" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </aside>
  );
}
