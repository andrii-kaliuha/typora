import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useScreenshot } from "../../hooks/useScreenshot";
import { useWatchReplay } from "../../hooks/useWatchReplay";
import { TextResult } from "../../shared/TextResult";
import { ResultButton } from "../../shared/ResultButton";
import { TestStatistics } from "../../shared/TestStatistics";
import { getFileName } from "../../utils/typing/getFileName";
import { clearHistory, removeFromHistory } from "../../store/resultsSlice";
import { formatStats } from "../../utils/formatters/formatStats";
import { Filter } from "../../components/Filter";
import { selectFilteredAndSortedHistory } from "../../store/selectors/historySelectors";
import { SortComponent } from "../../components/SortComponent";
import { Pagination } from "../../components/Pagination";
import type { HistoryTestResultProps } from "../../types/types";
import "./HistoryPage.css";

export const HistoryPage = () => {
  const history = useSelector(selectFilteredAndSortedHistory);

  return (
    <div className="history-page">
      <HistoryHeader />
      {history.length > 0 ? <HistoryList /> : <EmptyHistory />}
    </div>
  );
};

const HistoryHeader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClearHistory = () => {
    if (window.confirm(t("history.confirm-clear"))) dispatch(clearHistory());
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleToggleFilter = () => setIsFilterOpen((prev) => !prev);

  return (
    <div className="history-header">
      <div className="buttons-container">
        <HistoryHeaderButton action={handleToggleFilter} name={t("history.filter-btn")} icon="filter-icon" />
        <HistoryHeaderButton action={() => console.log("sort")} name={t("history.sort-btn")} icon="sort-icon" />
        <SortComponent />
      </div>

      <Filter isOpen={isFilterOpen} onClose={handleToggleFilter} />

      <HistoryHeaderButton action={handleClearHistory} name={t("history.clear-all")} icon="delete-icon" />
    </div>
  );
};

type HistoryHeaderButtonProps = { action: () => void; name: string; icon: string };

export const HistoryHeaderButton = ({ action, name, icon }: HistoryHeaderButtonProps) => {
  return (
    <button type="button" className="result-button" onClick={action}>
      <svg width={24} height={24}>
        <use href={`./src/assets/icons.svg#${icon}`} />
      </svg>
      <p>{name}</p>
    </button>
  );
};

const HistoryList = () => {
  const history = useSelector(selectFilteredAndSortedHistory);

  return (
    <>
      <ul className="history-list">
        {history.map((item) => (
          <HistoryTestResult key={item.id} text={item.textData} stats={item.stats} id={item.id} />
        ))}
      </ul>

      <Pagination />
    </>
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
