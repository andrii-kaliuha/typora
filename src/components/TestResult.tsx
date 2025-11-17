import "./TestResult.css";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useScreenshot } from "../hooks/useScreenshot";
import { useWatchReplay } from "../hooks/useWatchReplay";
import { TextResult } from "../shared/TextResult";
import { ResultButton } from "../shared/ResultButton";
import { TestStatistics } from "../shared/TestStatistics";
import { getNewText } from "../utils/typing/getText";
import { getFileName } from "../utils/typing/getFileName";
import { resetTest } from "../store/testSlice";
import { setRandomText } from "../store/configSlice";
import type { TestResultProps } from "../types/types";
import type { RootState } from "../store";
import { formatStats } from "../utils/formatters/formatStats";

export const TestResult = ({ text, stats }: TestResultProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const DivRef = useRef<HTMLDivElement>(null);
  const formattedStats = formatStats(stats);
  const { textType, language, currentText } = useSelector((state: RootState) => state.config);

  const { isPlaying, cursorIndex, handleTogglePlay } = useWatchReplay(text);
  const { captureAndDownload } = useScreenshot(getFileName(stats.date));

  const handleCapture = () => captureAndDownload(DivRef.current);

  const handleRepeatTest = useCallback(() => {
    dispatch(resetTest());
  }, [dispatch]);

  const handleNextTest = useCallback(() => {
    dispatch(resetTest());

    if (textType === "random") {
      const newRandomText = getNewText(currentText, language);
      dispatch(setRandomText(newRandomText));
    }
  }, [currentText, language, textType, dispatch]);

  return (
    <div className="test-result" ref={DivRef}>
      <TextResult text={text} isReplaying={isPlaying} cursorIndex={cursorIndex} />
      <TestStatistics stats={formattedStats} />
      <div className="buttons-container">
        <ResultButton action={handleTogglePlay} name={t("result.watch-replay")} icon={isPlaying === false ? "play-icon" : "pause-icon"} />
        <ResultButton action={handleCapture} name={t("result.screenshot")} icon="screenshot-icon" />
        <ResultButton action={handleRepeatTest} name={t("result.repeat-test")} icon="repeat-icon" />
        <ResultButton action={handleNextTest} name={t("result.next-test")} icon="next-icon" />
      </div>
    </div>
  );
};
