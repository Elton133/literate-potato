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

type Status = "idle" | "loading" | "playing" | "paused" | "unavailable" | "error";

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
      else setStatus("paused");
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
