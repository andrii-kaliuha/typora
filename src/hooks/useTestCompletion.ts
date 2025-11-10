import { useCallback, type RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/index";
import { completeTest } from "../store/testSlice";
import { addToHistory } from "../store/resultsSlice";
import type { Mode, TestResultItem, TestStatus, TypedHistoryEntry, WordData } from "../types/types";
import { calculateMetrics } from "../utils/calculateMetrics";

type UseTestCompletionProps = {
  typedHistory: TypedHistoryEntry[];
  targetText: string;
  mode: Mode;
  testStatus: TestStatus;
  startTimeRef: RefObject<number | null>;
};

export const useTestCompletion = ({ typedHistory, targetText, mode, testStatus, startTimeRef }: UseTestCompletionProps) => {
  const dispatch = useDispatch();
  const { duration, language, textType } = useSelector((state: RootState) => state.config);

  const finishTest = useCallback(
    (finalTextData: WordData[]) => {
      if (testStatus === "finished") return;

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

      if (textType !== "custom") statsForDisplay.push({ label: "result.language", value: `result.${language}` });

      statsForDisplay.push({ label: "result.text", value: `result.${textType}-text` }, { label: "result.date", value: Date.now() });

      const resultItem: TestResultItem = { textData: finalTextData, stats: statsForDisplay, id: crypto.randomUUID() };

      dispatch(completeTest(resultItem));
      dispatch(addToHistory(resultItem));
    },
    [typedHistory, targetText, duration, language, textType, mode, testStatus, startTimeRef, dispatch]
  );

  return { finishTest };
};
