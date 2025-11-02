import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/index";
import { startTest, completeTest, resetTest } from "../store/testSlice";
import { addToHistory, type TestResultItem } from "../store/resultsSlice";

type TestStatus = "idle" | "running" | "finished";
type TestMetrics = { wpm: number; accuracy: number };
type TypedHistoryEntry = [string, number];
type Mode = "normal" | "accuracy" | "strict";
type LetterData = { letter: string; status: "cursor" | "untyped" | "correct" | "incorrect"; typedAt: number | null };
type WordData = { letters: LetterData[]; status: "correct" | "untyped" | "incorrect" };
type TypingTestProps = { targetText: string; timeLimit: number; mode: Mode };

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

export const useTypingTest = ({ targetText, timeLimit, mode }: TypingTestProps) => {
  const dispatch = useDispatch();

  const { duration, language, textType } = useSelector((state: RootState) => state.config);

  const globalTestStatus = useSelector((state: RootState) => state.test.status) as TestStatus;

  const [typedText, setTypedText] = useState("");
  const [typedHistory, setTypedHistory] = useState<TypedHistoryEntry[]>([]);
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  const startTimeRef = useRef<number | null>(null);

  const handleRestart = useCallback(() => {
    setTypedText("");
    setTypedHistory([]);
    dispatch(resetTest());
    setTimeLeft(timeLimit);
    startTimeRef.current = null;
  }, [timeLimit]);

  useEffect(() => {
    handleRestart();
  }, [targetText, timeLimit, handleRestart]);

  const finishTest = useCallback(
    (finalTextData: WordData[]) => {
      if (globalTestStatus === "finished") return;

      const endTime = Date.now();
      const timeElapsed = startTimeRef.current ? (endTime - startTimeRef.current) / 1000 : 0;

      const metrics = calculateMetrics(typedHistory, targetText, timeElapsed);

      let correctChars = 0;
      let incorrectChars = 0;
      let untypedChars = 0;

      finalTextData.forEach((word) => {
        word.letters.forEach((letter) => {
          if (letter.status === "correct") correctChars++;
          else if (letter.status === "incorrect") incorrectChars++;
          else if (letter.status === "untyped") untypedChars++;
        });
      });

      const statsForDisplay: TestResultItem["stats"] = [
        { label: "result.wpm", value: metrics.wpm },
        { label: "result.accuracy", value: `${metrics.accuracy}%` },
        { label: "result.characters", value: `${correctChars}/${incorrectChars}/${untypedChars}` },
        { label: "result.duration", value: duration },
        { label: "result.mode", value: `result.${mode}` },
      ];

      if (textType !== "custom") {
        statsForDisplay.push({ label: "result.language", value: `result.${language}` });
      }

      statsForDisplay.push({ label: "result.text", value: `result.${textType}-text` }, { label: "result.date", value: Date.now() });

      const resultItem: TestResultItem = {
        textData: finalTextData,
        stats: statsForDisplay,
        id: crypto.randomUUID(),
      };

      dispatch(completeTest(resultItem));
      dispatch(addToHistory(resultItem));
    },
    [typedHistory, targetText, dispatch, duration, language, textType, mode, globalTestStatus]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (globalTestStatus === "finished") return;

      const now = Date.now();
      const isCharacterKey =
        event.key.length === 1 &&
        event.key !== "Meta" &&
        event.key !== "Shift" &&
        event.key !== "Control" &&
        event.key !== "Alt" &&
        event.key !== "F5";
      if (event.key === "Backspace" && globalTestStatus === "running") {
        if (mode === "accuracy" || mode === "strict") {
          event.preventDefault();
          return;
        }

        event.preventDefault();
        setTypedText((prevTypedText) => prevTypedText.slice(0, -1));
        setTypedHistory((prevHistory) => prevHistory.slice(0, -1));
      } else if (isCharacterKey) {
        if (globalTestStatus === "idle") {
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

        if (currentPosition < targetText.length || mode === "normal") {
          event.preventDefault();
          setTypedText((prevTypedText) => prevTypedText + event.key);
          setTypedHistory((prevHistory) => [...prevHistory, [event.key, now]]);
        }
      }
    },
    [globalTestStatus, typedText, targetText, mode, dispatch]
  );

  useEffect(() => {
    if (globalTestStatus !== "running" || timeLeft === 0) return;

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
  }, [globalTestStatus, timeLeft]);

  return { typedText, typedHistory, timeLeft, handleRestart, handleKeyDown, finishTest, testStatus: globalTestStatus };
};
