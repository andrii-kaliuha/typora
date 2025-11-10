import { useTranslation } from "react-i18next";
import { ResultButton } from "./ResultButton";
import { formatTime } from "../utils/formatters";

type TestControlsProps = { timeLeft: number; onRestart: () => void };

export const TestControls = ({ timeLeft, onRestart }: TestControlsProps) => {
  const { t } = useTranslation();

  return (
    <div className="buttons-container">
      <ResultButton action={onRestart} name={t("result.restart-test")} icon="repeat-icon" />
      <span className="timer">{formatTime(timeLeft)}</span>
    </div>
  );
};
