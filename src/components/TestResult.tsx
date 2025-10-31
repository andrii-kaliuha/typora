import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./TestResult.css";
import { useScreenshot } from "../hooks/useScreenshot";
import { useWatchReplay } from "../hooks/useWatchReplay";
import { TextResult } from "../shared/TextResult";
import { ResultButton } from "../shared/ResultButton";
import { TestStatistics } from "../shared/TestStatistics";
import { getFileName, getNewText } from "../utils/utils";
import type { RootState } from "../store";
import { resetTest } from "../store/testSlice";
import { setRandomText } from "../store/configSlice";

type TestResultProps = {
  text: { letters: { letter: string; status: string; typedAt: number | null }[]; status: string }[];
  stats: { label: string; value: string | number | Date }[];
};

export const TestResult = ({ text, stats }: TestResultProps) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { isPlaying, replayCharIndex, handleTogglePlay } = useWatchReplay(text);
  const { textType, language, currentText } = useSelector((state: RootState) => state.config);

  const dateStat = stats.find((stat) => stat.label === "result.date");
  const dateUnixMilliseconds = dateStat?.value as number | undefined;

  const { captureAndDownload } = useScreenshot(getFileName(dateUnixMilliseconds));
  const DivRef = useRef<HTMLDivElement>(null);
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
      <TextResult text={text} isReplaying={isPlaying} replayCharIndex={replayCharIndex} />
      <TestStatistics stats={stats} />
      <div className="buttons-container">
        <ResultButton click={handleTogglePlay} name={t("result.watch-replay")} icon={isPlaying === false ? "play-icon" : "pause-icon"} />
        <ResultButton click={handleCapture} name={t("result.screenshot")} icon="screenshot-icon" />
        <ResultButton click={handleRepeatTest} name={t("result.repeat-test")} icon="repeat-icon" />
        <ResultButton click={handleNextTest} name={t("result.next-test")} icon="next-icon" />
      </div>
    </div>
  );
};
