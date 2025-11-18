import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/index";
import { completeTest } from "../store/testSlice";
import { addToHistory } from "../store/resultsSlice";
import type { UseTestCompletionProps, WordData, TestResultItem } from "../types/types";
import { calculateMetrics } from "../utils/typing/calculateMetrics";
import { countTypedCharacters } from "../utils/typing/countTypedCharacters";

export const useTestCompletion = ({ typedHistory, targetText, testStatus, startTimeRef, timeLeft, textData }: UseTestCompletionProps) => {
  const dispatch = useDispatch();
  const { textType, language, duration, mode } = useSelector((state: RootState) => state.config);

  const finishTest = useCallback(
    (text: WordData[]) => {
      if (testStatus === "finished") return;

      const timeElapsed = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : 0;

      const { wpm, accuracy } = calculateMetrics(typedHistory, targetText, timeElapsed);
      const { correctChars, incorrectChars, untypedChars } = countTypedCharacters(text);

      const stats = {
        wpm: wpm,
        accuracy: accuracy,
        characters: { correctChars: correctChars, incorrectChars: incorrectChars, untypedChars: untypedChars },
        duration: timeElapsed,
        mode: mode,
        language: language,
        textType: textType,
        date: Date.now(),
      };

      const resultItem: TestResultItem = { textData: text, stats: stats, id: crypto.randomUUID() };

      dispatch(completeTest(resultItem));
      dispatch(addToHistory(resultItem));
    },
    [typedHistory, targetText, testStatus, startTimeRef, textType, language, duration, mode, dispatch]
  );

  const isTextFullyTyped = typedHistory.length === targetText.length && textData.every((word) => word.status !== "untyped");

  useEffect(() => {
    if (testStatus === "running" && (timeLeft === 0 || isTextFullyTyped)) {
      finishTest(textData);
    }
  }, [timeLeft, isTextFullyTyped, testStatus, textData, finishTest]);

  return {};
};
