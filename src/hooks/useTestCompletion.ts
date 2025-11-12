import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/index";
import { completeTest } from "../store/testSlice";
import { addToHistory } from "../store/resultsSlice";
import type { UseTestCompletionProps, WordData, TestResultItem } from "../types/types";
import { calculateMetrics } from "../utils/calculateMetrics";
import { countTypedCharacters } from "../utils/countTypedCharacters";

export const useTestCompletion = ({ typedHistory, targetText, testStatus, startTimeRef }: UseTestCompletionProps) => {
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
        text: textType,
        date: Date.now(),
      };

      const resultItem: TestResultItem = { textData: text, stats: stats, id: crypto.randomUUID() };

      dispatch(completeTest(resultItem));
      dispatch(addToHistory(resultItem));
    },
    [typedHistory, targetText, testStatus, startTimeRef, textType, language, duration, mode, dispatch]
  );

  return { finishTest };
};
