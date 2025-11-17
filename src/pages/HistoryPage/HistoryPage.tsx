import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useScreenshot } from "../../hooks/useScreenshot";
import { useWatchReplay } from "../../hooks/useWatchReplay";
import { TextResult } from "../../shared/TextResult";
import { ResultButton } from "../../shared/ResultButton";
import { TestStatistics } from "../../shared/TestStatistics";
import { getFileName } from "../../utils/typing/getFileName";
import { clearHistory, removeFromHistory } from "../../store/resultsSlice";
import type { HistoryTestResultProps } from "../../types/types";
import type { RootState } from "../../store";
import "./HistoryPage.css";
import { formatStats } from "../../utils/formatters/formatStats";

export const HistoryPage = () => {
  const history = useSelector((state: RootState) => state.results.history);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClearHistory = () => {
    if (window.confirm(t("history.confirm-clear"))) dispatch(clearHistory());
  };

  return (
    <div className="history-page">
      {history.length > 0 ? (
        <>
          <HistoryHeader action={handleClearHistory} />
          <HistoryList />
        </>
      ) : (
        <EmptyHistory />
      )}
    </div>
  );
};

const HistoryHeader = ({ action }: { action: () => void }) => {
  const { t } = useTranslation();

  const handleFilter = () => console.log("filter");
  const handleSort = () => console.log("sort");

  return (
    <div className="history-header">
      <div className="buttons-container">
        <button type="button" className="filter-button" onClick={handleFilter}>
          <svg width={24} height={24}>
            <use href="./src/assets/icons.svg#filter-icon" />
          </svg>
          <p>{t("history.filter")}</p>
        </button>

        <button type="button" className="sort-button" onClick={handleSort}>
          <svg width={24} height={24}>
            <use href="./src/assets/icons.svg#sort-icon" />
          </svg>
          <p>{t("history.sort")}</p>
        </button>
      </div>

      <button type="button" className="clear-all-button" onClick={action}>
        <p>{t("history.clear-all")}</p>
        <svg width={24} height={24}>
          <use href="./src/assets/icons.svg#delete-icon" />
        </svg>
      </button>
    </div>
  );
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

export const HistoryTestResult = ({ text, stats, id }: HistoryTestResultProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const LiRef = useRef<HTMLLIElement>(null);
  const formattedStats = formatStats(stats);

  const { isPlaying, cursorIndex, handleTogglePlay } = useWatchReplay(text);
  const { captureAndDownload } = useScreenshot(getFileName(stats.date));

  const handleCapture = () => captureAndDownload(LiRef.current);
  const handleDelete = () => {
    if (window.confirm(t("result.delete"))) dispatch(removeFromHistory(id));
  };

  return (
    <li className="test-result" ref={LiRef}>
      <TextResult text={text} isReplaying={isPlaying} cursorIndex={cursorIndex} />
      <TestStatistics stats={formattedStats} />
      <div className="buttons-container">
        <ResultButton action={handleTogglePlay} name={t("result.watch-replay")} icon={isPlaying === false ? "play-icon" : "pause-icon"} />
        <ResultButton action={handleCapture} name={t("result.screenshot")} icon="screenshot-icon" />
        <ResultButton action={handleDelete} name={t("result.delete")} icon="delete-icon" />
      </div>
    </li>
  );
};
