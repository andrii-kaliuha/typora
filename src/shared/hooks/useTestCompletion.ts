import { useCallback, useEffect, type RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/index";
import { completeTest } from "../../store/testSlice";
import { addToHistory } from "../../store/resultsSlice";
import type { Word, TestResultItem, TypedHistoryEntry, TestStatus } from "../types/types";
import { calculateMetrics } from "../utils/typing/calculateMetrics";
import { countTypedCharacters } from "../utils/typing/countTypedCharacters";

type UseTestCompletionProps = {
  typedHistory: TypedHistoryEntry[];
  targetText: string;
  testStatus: TestStatus;
  startTimeRef: RefObject<number | null>;
  timeLeft: number;
  textData: Word[];
};

export const useTestCompletion = ({ typedHistory, targetText, testStatus, startTimeRef, timeLeft, textData }: UseTestCompletionProps) => {
  const dispatch = useDispatch();
  const { textType, language, duration, mode } = useSelector((state: RootState) => state.config);

  const finishTest = useCallback(
    (text: Word[]) => {
      if (testStatus === "finished") return;

      const timeElapsed = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : 0;

      const { wpm, accuracy } = calculateMetrics(typedHistory, targetText, timeElapsed);
      const { correctChars, incorrectChars, untypedChars } = countTypedCharacters(text);

      const stats = {
        wpm,
        accuracy,
        characters: { correctChars, incorrectChars, untypedChars },
        duration: timeElapsed,
        mode,
        language,
        textType,
        date: Date.now(),
        typedHistory,
      };

      const resultItem: TestResultItem = { textData: text, stats: stats, id: crypto.randomUUID() };

      dispatch(completeTest(resultItem));
      dispatch(addToHistory(resultItem));
    },
    [typedHistory, targetText, testStatus, startTimeRef, textType, language, duration, mode, dispatch],
  );

  const typedLength = typedHistory.reduce((len, e) => {
    if (e.type === "char") return len + 1;
    if (e.type === "backspace") return len - 1;
    return len;
  }, 0);

  const isTextFullyTyped = typedLength === targetText.length && textData.every((word) => word.status !== "untyped");

  useEffect(() => {
    if (testStatus === "running" && (timeLeft === 0 || isTextFullyTyped)) {
      finishTest(textData);
    }
  }, [timeLeft, isTextFullyTyped, testStatus, textData, finishTest]);

  return {};
};
