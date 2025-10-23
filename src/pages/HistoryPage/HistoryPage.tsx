import "./HistoryPage.css";
import { historyList } from "../../utils/historyList";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useScreenshot } from "../../hooks/useScreenshot";
import { useTestReplay } from "../../hooks/useWatchReplay";
import { TextResult } from "../../shared/TextResult";
import { ResultButton } from "../../shared/ResultButton";
import { TestStatistics } from "../../shared/TestStatistics";

export const HistoryPage = () => {
  return (
    <div className="history-page">
      <ul className="history-list">
        {historyList.map((item, index) => (
          <HistoryTestResult key={index} text={item.text} stats={item.stats} />
        ))}
      </ul>
    </div>
  );
};

type HistoryTestResultProps = {
  text: { letters: { letter: string; status: string; typedAt: number | null }[]; status: string }[];
  stats: { label: string; value: string | number | Date }[];
};

export const HistoryTestResult = ({ text, stats }: HistoryTestResultProps) => {
  const { t } = useTranslation();

  const { isPlaying, replayCharIndex, handleTogglePlay } = useTestReplay(text);

  const { captureAndDownload } = useScreenshot("history-test-result");
  const LiRef = useRef<HTMLLIElement>(null);
  const handleCapture = () => captureAndDownload(LiRef.current);

  return (
    <li className="test-result" ref={LiRef}>
      <TextResult text={text} isReplaying={isPlaying} replayCharIndex={replayCharIndex} />
      <TestStatistics stats={stats} />
      <div className="buttons-container">
        <ResultButton click={handleTogglePlay} name={t("result.watch-replay")} icon={isPlaying === false ? "play-icon" : "pause-icon"} />
        <ResultButton click={handleCapture} name={t("result.screenshot")} icon="screenshot-icon" />
      </div>
    </li>
  );
};
