import { useRef } from "react";
import { useTranslation } from "react-i18next";
import "./TestResult.css";
import { useScreenshot } from "../hooks/useScreenshot";
import { useWatchReplay } from "../hooks/useWatchReplay";
import { TextResult } from "../shared/TextResult";
import { ResultButton } from "../shared/ResultButton";
import { TestStatistics } from "../shared/TestStatistics";

type TestResultProps = {
  text: { letters: { letter: string; status: string; typedAt: number | null }[]; status: string }[];
  stats: { label: string; value: string | number | Date }[];
  onRepeat: () => void;
  onNext: () => void;
};

export const TestResult = ({ text, stats, onRepeat, onNext }: TestResultProps) => {
  const { t } = useTranslation();
  const { isPlaying, replayCharIndex, handleTogglePlay } = useWatchReplay(text);

  const { captureAndDownload } = useScreenshot("test-result");
  const DivRef = useRef<HTMLDivElement>(null);
  const handleCapture = () => captureAndDownload(DivRef.current);

  return (
    <div className="test-result" ref={DivRef}>
      <TextResult text={text} isReplaying={isPlaying} replayCharIndex={replayCharIndex} />
      <TestStatistics stats={stats} />
      <div className="buttons-container">
        <ResultButton click={handleTogglePlay} name={t("result.watch-replay")} icon={isPlaying === false ? "play-icon" : "pause-icon"} />
        <ResultButton click={handleCapture} name={t("result.screenshot")} icon="screenshot-icon" />
        <ResultButton click={onRepeat} name={t("result.repeat-test")} icon="repeat-icon" />
        <ResultButton click={onNext} name={t("result.next-test")} icon="next-icon" />
      </div>
    </div>
  );
};
