import { useState, useRef, useEffect } from "react";
import type { Word } from "../types/types";

const REPLAY_SPEED = 1;

export const useWatchReplay = (text: Word[]) => {
  const [isPlaying, togglePlaying] = useState(false);
  const [cursorIndex, setReplayCharIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const flatTypedHistory = useRef<number[]>([]);

  useEffect(() => {
    const history: number[] = [];
    text.forEach((word) => {
      word.letters.forEach((letter) => {
        if (letter.typedAt !== null) {
          history.push(letter.typedAt);
        }
      });
    });
    const startTime = history[0] || 0;
    flatTypedHistory.current = history.map((time) => time - startTime);
  }, [text]);

  useEffect(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isPlaying) {
      return;
    }

    if (cursorIndex === flatTypedHistory.current.length) {
      setReplayCharIndex(0);
      return;
    }

    let currentIndex = cursorIndex;
    const history = flatTypedHistory.current;

    const runReplay = () => {
      if (currentIndex >= history.length - 1) {
        setReplayCharIndex(history.length);
        if (intervalRef.current) clearTimeout(intervalRef.current);
        togglePlaying(false);
        return;
      }

      const nextCharTime = history[currentIndex + 1];
      const currentCharTime = history[currentIndex];

      if (nextCharTime === undefined) return;

      const delay = (nextCharTime - currentCharTime) / REPLAY_SPEED;

      currentIndex++;
      setReplayCharIndex(currentIndex);

      intervalRef.current = setTimeout(runReplay, delay);
    };

    if (history.length > 0 && cursorIndex < history.length) {
      const initialDelay = history[cursorIndex + 1] ? (history[cursorIndex + 1] - history[cursorIndex]) / REPLAY_SPEED : 0;

      if (cursorIndex === 0) {
        intervalRef.current = setTimeout(runReplay, history[0] / REPLAY_SPEED);
      } else {
        intervalRef.current = setTimeout(runReplay, initialDelay);
      }
    }

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [isPlaying, cursorIndex]);

  const handleTogglePlay = () => {
    if (cursorIndex === flatTypedHistory.current.length && !isPlaying) {
      setReplayCharIndex(0);
    }
    togglePlaying((prevIsPlaying) => !prevIsPlaying);
  };

  useEffect(() => {
    if (!isPlaying && intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
  }, [isPlaying]);

  return { isPlaying, cursorIndex, handleTogglePlay };
};
