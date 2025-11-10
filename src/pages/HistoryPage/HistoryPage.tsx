import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useScreenshot } from "../../hooks/useScreenshot";
import { useWatchReplay } from "../../hooks/useWatchReplay";
import { TextResult } from "../../shared/TextResult";
import { ResultButton } from "../../shared/ResultButton";
import { TestStatistics } from "../../shared/TestStatistics";
import { getFileName } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import "./HistoryPage.css";
import { removeFromHistory } from "../../store/resultsSlice";

export const HistoryPage = () => {
  const history = useSelector((state: RootState) => state.results.history);

  return <div className="history-page">{history.length > 0 ? <HistoryList /> : <EmptyHistory />}</div>;
};

const HistoryList = () => {
  const history = useSelector((state: RootState) => state.results.history);

  return (
    <ul className="history-list">
      {history.map((item) => (
        <HistoryTestResult key={item.id} text={item.textData} stats={item.stats} id={item.id} />
      ))}
    </ul>
  );
};

const EmptyHistory = () => {
  const { t } = useTranslation();
  return (
    <div className="empty-history">
      <h1 className="empty-history-title">{t("history.title")}</h1>
      <p className="empty-history-action">{t("history.action")}</p>
    </div>
  );
};

type HistoryTestResultProps = {
  id: string;
  text: { letters: { letter: string; status: string; typedAt: number | null }[]; status: string }[];
  stats: { label: string; value: string | number | Date }[];
};

export const HistoryTestResult = ({ text, stats, id }: HistoryTestResultProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isPlaying, replayCharIndex, handleTogglePlay } = useWatchReplay(text);

  const dateStat = stats.find((stat) => stat.label === "result.date");
  const dateUnixMilliseconds = dateStat?.value as number | undefined;

  const { captureAndDownload } = useScreenshot(getFileName(dateUnixMilliseconds));
  const LiRef = useRef<HTMLLIElement>(null);
  const handleCapture = () => captureAndDownload(LiRef.current);
  const handleDelete = () => dispatch(removeFromHistory(id));

  return (
    <li className="test-result" ref={LiRef}>
      <TextResult text={text} isReplaying={isPlaying} replayCharIndex={replayCharIndex} />
      <TestStatistics stats={stats} />
      <div className="buttons-container">
        <ResultButton action={handleTogglePlay} name={t("result.watch-replay")} icon={isPlaying === false ? "play-icon" : "pause-icon"} />
        <ResultButton action={handleCapture} name={t("result.screenshot")} icon="screenshot-icon" />
        <ResultButton action={handleDelete} name={t("result.delete")} icon="delete-icon" />
      </div>
    </li>
  );
};
