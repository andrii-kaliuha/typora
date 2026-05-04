import { useTranslation } from "react-i18next";
import { ResultButton } from "../../shared/TestDisplay/ResultButton";
import { formatTime } from "../../utils/formatters/formatTime";
// import { ResultButton } from "../../../shared/TestDisplay/ResultButton";
// import { formatTime } from "../../../utils/formatters/formatTime";

type TestControlsProps = { onRestart: () => void; timeLeft: number };

export const TestControls = ({ onRestart, timeLeft }: TestControlsProps) => {
  const { t } = useTranslation();

  return (
    <div className="buttons-container">
      <ResultButton action={onRestart} name={t("result.restart-test")} icon="repeat-icon" />
      <span className="timer">{formatTime(timeLeft)}</span>
    </div>
  );
};
