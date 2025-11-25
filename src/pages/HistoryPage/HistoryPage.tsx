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
import { selectPaginatedHistory } from "../../store/selectors/historySelectors";
import { Pagination } from "../../components/Pagination";
import type { HistoryTestResultProps } from "../../types/types";
import "./HistoryPage.css";
import { Filter } from "../../components/Filter";
import { ConfirmModal } from "../../shared/ConfirmModal";
import { ErrorModal } from "../../shared/ErrorModal";
import { Sort } from "../../components/Sort";

export const HistoryPage = () => {
  const history = useSelector(selectPaginatedHistory);

  return (
    <div className="history-page">
      <HistoryControls />
      {history.length > 0 ? <HistoryList /> : <EmptyHistory />}
    </div>
  );
};

const HistoryControls = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const handleClearHistory = () => setIsConfirmModalOpen(true);

  const handleConfirmClear = () => {
    dispatch(clearHistory());
    setIsConfirmModalOpen(false);
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleToggleFilter = () => setIsFilterOpen((prev) => !prev);

  return (
    <div className={`history-controls ${isFilterOpen ? "filter-open" : ""}`}>
      <div className="history-header">
        <div className="buttons-container">
          <HistoryControl action={handleToggleFilter} name={t("history.filter.title")} icon="filter-icon" />
          <Sort />
        </div>

        <HistoryControl action={handleClearHistory} name={t("history.clear-all")} icon="delete-icon" />
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        message={t("modal.confirm.message-delete-all")}
        onConfirm={handleConfirmClear}
        onClose={() => setIsConfirmModalOpen(false)}
      />

      <Filter isOpen={isFilterOpen} />

      {/* <Modal isOpen={isFilterOpen} onClose={handleToggleFilter}>
        <Filter isOpen={isFilterOpen} />
      </Modal> */}
    </div>
  );
};

type HistoryControlProps = { action: () => void; name: string; icon: string };

export const HistoryControl = ({ action, name, icon }: HistoryControlProps) => {
  return (
    <button type="button" className="history-control-button" onClick={action}>
      <svg width={24} height={24}>
        <use href={`./src/assets/icons.svg#${icon}`} />
      </svg>
      <p>{name}</p>
    </button>
  );
};

const HistoryList = () => {
  const history = useSelector(selectPaginatedHistory);

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
  const { captureAndDownload, error, clearError } = useScreenshot(getFileName(stats.date), false);

  const handleCapture = () => captureAndDownload(LiRef.current);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const handleDelete = () => setIsConfirmModalOpen(true);

  const handleConfirmClear = () => {
    dispatch(removeFromHistory(id));
    setIsConfirmModalOpen(false);
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
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        message={t("modal.confirm.message")}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmClear}
      />
      <ErrorModal isOpen={!!error} onClose={clearError} message={error} />
    </li>
  );
};
