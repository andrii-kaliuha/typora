import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/index";
import { startTest, resetTest } from "../../store/testSlice";
import { useTimer } from "./useTimer";
import type { Mode, TestStatus, TypedHistoryEntry } from "../types/types";

type TypingTestProps = { targetText: string; timeLimit: number; mode: Mode };

export const useTypingTest = ({ targetText, timeLimit, mode }: TypingTestProps) => {
  const dispatch = useDispatch();
  const testStatus = useSelector((state: RootState) => state.test.status) as TestStatus;

  const [typedText, setTypedText] = useState("");
  const [typedHistory, setTypedHistory] = useState<TypedHistoryEntry[]>([]);
  const [timeLeft, setTimeLeft] = useTimer(timeLimit, testStatus);

  const startTimeRef = useRef<number | null>(null);

  const handleRestart = useCallback(() => {
    setTypedText("");
    setTypedHistory([]);
    dispatch(resetTest());
    setTimeLeft(timeLimit);
    startTimeRef.current = null;
  }, [timeLimit, setTimeLeft, dispatch]);

  useEffect(() => {
    handleRestart();
  }, [targetText, timeLimit, handleRestart]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (testStatus === "finished") return;

      const now = Date.now();
      const isCharacterKey = event.key.length === 1 && !["Meta", "Shift", "Control", "Alt", "F5"].includes(event.key);

      if (event.key === "Backspace" && testStatus === "running") {
        if (mode === "accuracy" || mode === "strict") {
          event.preventDefault();
          return;
        }
        event.preventDefault();
        setTypedText((prev) => prev.slice(0, -1));
        setTypedHistory((prev) => [...prev, { type: "backspace", timestamp: now }]);
        return;
      }

      if (isCharacterKey) {
        if (testStatus === "idle") {
          startTimeRef.current = now;
          dispatch(startTest());
        }

        const currentPosition = typedText.length;

        if (mode === "strict" && currentPosition < targetText.length) {
          if (event.key !== targetText[currentPosition]) {
            event.preventDefault();
            return;
          }
        }

        if (currentPosition < targetText.length) {
          event.preventDefault();
          setTypedText((prev) => prev + event.key);
          setTypedHistory((prev) => [...prev, { type: "char", key: event.key, timestamp: now }]);
        }
      }
    },
    [testStatus, typedText, targetText, mode, dispatch],
  );

  return { typedText, typedHistory, timeLeft, handleRestart, handleKeyDown, testStatus, startTimeRef };
};
