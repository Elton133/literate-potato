"use client";

import { getTrack } from "@/content/site";
import { useAudio } from "./AudioProvider";
import { PauseIcon, PlayIcon } from "./icons";

/**
 * The hero's primary action: play (or pause) a track's preview through
 * the site player. Styling comes from the caller via `className`.
 */
export function ListenButton({
  trackId,
  label,
  className,
}: {
  trackId: string;
  label: string;
  className?: string;
}) {
  const { track, isPlaying, toggle, engaged } = useAudio();
  const t = getTrack(trackId);
  const playing = engaged && isPlaying && track?.id === trackId;

  return (
    <button
      type="button"
      className={className}
      onClick={() => toggle(trackId)}
      aria-pressed={playing}
      aria-label={playing ? `Pause ${t?.title ?? ""}` : `${label} — play a preview of ${t?.title ?? ""}`}
    >
      {playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
      <span>{playing ? "Pause" : label}</span>
    </button>
  );
}
