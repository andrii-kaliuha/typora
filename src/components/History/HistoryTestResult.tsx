import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useScreenshot } from "../../hooks/useScreenshot";
import { useWatchReplay } from "../../hooks/useWatchReplay";
import { TextResult } from "../../components/Test/TextResult";
import { ResultButton } from "../../components/Shared/ResultButton";
import { TestStatistics } from "../../components/Test/TestStatistics";
import { getFileName } from "../../utils/typing/getFileName";
import { removeFromHistory } from "../../store/resultsSlice";
import { formatStats } from "../../utils/formatters/formatStats";
import { ConfirmModal } from "../../components/Shared/ConfirmModal";
import { ErrorModal } from "../../components/Shared/ErrorModal";
import type { HistoryTestResultProps } from "../../types/types";

export const HistoryTestResult = ({ textData, stats, id }: HistoryTestResultProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const LiRef = useRef<HTMLLIElement>(null);
  const formattedStats = formatStats(stats);

  const { isPlaying, cursorIndex, handleTogglePlay } = useWatchReplay(textData);
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
      <TextResult text={textData} isReplaying={isPlaying} cursorIndex={cursorIndex} />
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
