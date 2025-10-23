import { useState, useEffect, useRef, useCallback } from "react";

type TestStatus = "idle" | "running" | "finished";
type TestMetrics = { wpm: number; accuracy: number };
type WordData = { letters: any[]; status: "correct" | "untyped" | "incorrect" };
type TypedHistoryEntry = [string, number];

const calculateMetrics = (typedHistory: TypedHistoryEntry[], targetText: string, timeElapsed: number): TestMetrics => {
  if (timeElapsed === 0) return { wpm: 0, accuracy: 0 };

  const typedCharsCount = typedHistory.length;
  let correctCharsCount = 0;

  const wpm = Math.round(typedCharsCount / 5 / (timeElapsed / 60));

  for (let i = 0; i < typedCharsCount; i++) {
    if (i < targetText.length && targetText[i] === typedHistory[i][0]) {
      correctCharsCount++;
    }
  }

  const accuracy = typedCharsCount > 0 ? Math.round((correctCharsCount / typedCharsCount) * 100) : 0;

  return { wpm, accuracy };
};

export const useTypingTest = (targetText: string, timeLimit: number, onTestComplete: (data: WordData[], metrics: TestMetrics) => void) => {
  const [typedText, setTypedText] = useState("");
  const [typedHistory, setTypedHistory] = useState<TypedHistoryEntry[]>([]);
  const [testStatus, setTestStatus] = useState<TestStatus>("idle");
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  const startTimeRef = useRef<number | null>(null);

  const handleRestart = useCallback(() => {
    setTypedText("");
    setTypedHistory([]);
    setTestStatus("idle");
    setTimeLeft(timeLimit);
    startTimeRef.current = null;
  }, [timeLimit]);

  const finishTest = useCallback(
    (finalTextData: WordData[]) => {
      setTestStatus((currentStatus) => {
        if (currentStatus === "finished") return "finished";

        const endTime = Date.now();
        const timeElapsed = startTimeRef.current ? (endTime - startTimeRef.current) / 1000 : 0;

        const metrics = calculateMetrics(typedHistory, targetText, timeElapsed);
        onTestComplete(finalTextData, metrics);

        return "finished";
      });
    },
    [typedHistory, targetText, onTestComplete]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (testStatus === "finished") return;

      const now = Date.now();

      if (testStatus === "idle" && event.key.length === 1 && event.key !== "F5") {
        setTestStatus("running");
        startTimeRef.current = now;
      }

      if (testStatus === "running") {
        if (event.key.length === 1 && event.key !== "F5") {
          event.preventDefault();
          setTypedText((prevTypedText) => prevTypedText + event.key);
          setTypedHistory((prevHistory) => [...prevHistory, [event.key, now]]);
        } else if (event.key === "Backspace") {
          event.preventDefault();
          setTypedText((prevTypedText) => prevTypedText.slice(0, -1));
          setTypedHistory((prevHistory) => prevHistory.slice(0, -1));
        }
      }
    },
    [testStatus]
  );

  useEffect(() => {
    if (testStatus !== "running" || timeLeft === 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [testStatus, timeLeft]);

  return { typedText, typedHistory, testStatus, timeLeft, handleRestart, handleKeyDown, finishTest };
};
