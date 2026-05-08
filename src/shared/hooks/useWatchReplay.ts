import { useState, useRef, useEffect } from "react";
import type { TypedHistoryEntry } from "../types/types";

const REPLAY_SPEED = 1;

export const useWatchReplay = (typedHistory: TypedHistoryEntry[]) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [replayTypedText, setReplayTypedText] = useState("");
  const intervalRef = useRef<number | null>(null);
  const replayIndexRef = useRef(0);

  const normalizedHistory = useRef<TypedHistoryEntry[]>([]);

  useEffect(() => {
    if (typedHistory.length === 0) return;
    const startTime = typedHistory[0].timestamp;
    normalizedHistory.current = typedHistory.map((e) => ({
      ...e,
      timestamp: e.timestamp - startTime,
    }));
  }, [typedHistory]);

  const runReplay = () => {
    const history = normalizedHistory.current;
    const index = replayIndexRef.current;

    if (index >= history.length) {
      setIsPlaying(false);
      return;
    }

    const current = history[index];

    setReplayTypedText((prev) => {
      if (current.type === "char") return prev + current.key;
      if (current.type === "backspace") return prev.slice(0, -1);
      return prev;
    });

    replayIndexRef.current = index + 1;

    const next = history[index + 1];
    if (next) {
      const delay = (next.timestamp - current.timestamp) / REPLAY_SPEED;
      intervalRef.current = setTimeout(runReplay, delay);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      return;
    }

    const history = normalizedHistory.current;
    if (history.length === 0) return;

    const initialDelay = history[0].timestamp / REPLAY_SPEED;
    intervalRef.current = setTimeout(runReplay, initialDelay);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (!isPlaying && replayIndexRef.current >= normalizedHistory.current.length) {
      replayIndexRef.current = 0;
      setReplayTypedText("");
    }
    setIsPlaying((prev) => !prev);
  };

  return { isPlaying, replayTypedText, handleTogglePlay };
};
