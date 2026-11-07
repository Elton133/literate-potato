"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { artist, featuredTrackId, getTrack, trackLabel, tracks, type Track } from "@/content/site";

type Status = "idle" | "loading" | "playing" | "paused" | "ended" | "unavailable" | "error";

type AudioState = {
  track: Track | null;
  status: Status;
  /** True once the listener has pressed play at least once — reveals the dock. */
  engaged: boolean;
  isPlaying: boolean;
  /** Play / pause a given track, or the current/featured one. */
  toggle: (id?: string) => void;
  next: () => void;
  prev: () => void;
  seek: (fraction: number) => void;
  dismiss: () => void;
};

type Progress = { current: number; duration: number };

const AudioCtx = createContext<AudioState | null>(null);
const ProgressCtx = createContext<Progress>({ current: 0, duration: 0 });

const playable = () => tracks.filter((t) => t.audio);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [trackId, setTrackId] = useState<string>(featuredTrackId);
  const [status, setStatus] = useState<Status>("idle");
  const [engaged, setEngaged] = useState(false);
  const [progress, setProgress] = useState<Progress>({ current: 0, duration: 0 });

  const track = getTrack(trackId);

  // One audio element for the whole site.
  useEffect(() => {
    const el = new Audio();
    el.preload = "none";
    audioRef.current = el;

    const onTime = () => setProgress({ current: el.currentTime, duration: el.duration || 0 });
    const onPlay = () => setStatus("playing");
    const onPause = () => setStatus((s) => (s === "unavailable" ? s : "paused"));
    const onWaiting = () => setStatus("loading");
    const onError = () => setStatus("error");

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onTime);
    el.addEventListener("playing", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("waiting", onWaiting);
    el.addEventListener("error", onError);

    return () => {
      el.pause();
      el.removeAttribute("src");
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onTime);
      el.removeEventListener("playing", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("waiting", onWaiting);
      el.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, []);

  const start = useCallback((t: Track) => {
    const el = audioRef.current;
    setEngaged(true);
    setTrackId(t.id);
    if (!el) return;

    if (!t.audio) {
      // No verified audio yet — say so honestly instead of pretending to play.
      el.pause();
      setProgress({ current: 0, duration: 0 });
      setStatus("unavailable");
      return;
    }

    const resolved = new URL(t.audio, window.location.href).href;
    if (el.src !== resolved) {
      el.src = resolved;
      setProgress({ current: 0, duration: 0 });
    }
    setStatus("loading");
    el.play().catch(() => setStatus("error"));
  }, []);

  const toggle = useCallback(
    (id?: string) => {
      const el = audioRef.current;
      const target = getTrack(id ?? trackId);
      if (!target) return;
      const same = target.id === trackId && engaged;

      if (same && (status === "playing" || status === "loading")) {
        el?.pause();
        return;
      }
      start(target);
    },
    [trackId, engaged, status, start],
  );

  const step = useCallback(
    (dir: 1 | -1) => {
      const list = playable().length ? playable() : tracks;
      const i = list.findIndex((t) => t.id === trackId);
      const nextTrack = list[(i + dir + list.length) % list.length];
      if (nextTrack) start(nextTrack);
    },
    [trackId, start],
  );

  // Auto-advance through playable tracks.
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => {
      const list = playable();
      const i = list.findIndex((t) => t.id === trackId);
      if (i > -1 && i < list.length - 1) start(list[i + 1]);
      else setStatus("ended"); // previews end here — the dock points to the full song
    };
    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, [trackId, start]);

  const seek = useCallback((fraction: number) => {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    el.currentTime = Math.min(Math.max(fraction, 0), 1) * el.duration;
  }, []);

  const dismiss = useCallback(() => {
    audioRef.current?.pause();
    setEngaged(false);
    setStatus("idle");
  }, []);

  // Lock-screen / hardware media keys.
  useEffect(() => {
    if (!("mediaSession" in navigator) || !track || !track.audio || !engaged) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: trackLabel(track),
      artist: artist.name,
    });
    navigator.mediaSession.setActionHandler("play", () => audioRef.current?.play());
    navigator.mediaSession.setActionHandler("pause", () => audioRef.current?.pause());
    navigator.mediaSession.setActionHandler("nexttrack", () => step(1));
    navigator.mediaSession.setActionHandler("previoustrack", () => step(-1));
  }, [track, engaged, step]);

  // ── Small details ──────────────────────────────────────────

  // The tab plays along: "▶ He Dey · Craig Osae" while playing, and a
  // gentle nudge if the listener wanders off to another tab.
  useEffect(() => {
    const base = document.title;
    const playing = status === "playing" || status === "loading";
    const set = () => {
      if (!playing || !track) document.title = base;
      else if (document.hidden) document.title = `♪ Still playing — ${track.title}`;
      else document.title = `▶ ${track.title} · ${artist.name}`;
    };
    set();
    document.addEventListener("visibilitychange", set);
    return () => {
      document.removeEventListener("visibilitychange", set);
      document.title = base;
    };
  }, [status, track]);

  // "K" plays / pauses, as it does on YouTube. Ignored while typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "k" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el?.closest("input, textarea, select, [contenteditable]")) return;
      e.preventDefault();
      toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  // A line for whoever opens the console.
  useEffect(() => {
    console.log(
      "%cCraig Osae%c  Afrogospel, from Ghana.\nIt starts with an encounter.  — craigosae.com",
      "font: 800 14px system-ui; letter-spacing: -0.02em",
      "font: 12px system-ui; color: #A36552",
    );
  }, []);

  const value = useMemo<AudioState>(
    () => ({
      track,
      status,
      engaged,
      isPlaying: status === "playing" || status === "loading",
      toggle,
      next: () => step(1),
      prev: () => step(-1),
      seek,
      dismiss,
    }),
    [track, status, engaged, toggle, step, seek, dismiss],
  );

  return (
    <AudioCtx.Provider value={value}>
      <ProgressCtx.Provider value={progress}>{children}</ProgressCtx.Provider>
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used inside <AudioProvider>");
  return ctx;
}

export const useProgress = () => useContext(ProgressCtx);

export const formatTime = (s: number) => {
  if (!Number.isFinite(s) || s <= 0) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};
