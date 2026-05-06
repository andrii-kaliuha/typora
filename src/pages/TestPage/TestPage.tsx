import { useSelector } from "react-redux";
import type { RootState } from "../../store/index";
import { TextConfig } from "../../features/typing-test/TextConfig";
import { TextContainer } from "../../features/typing-test/TextContainer";
import { TestResult } from "../../features/typing-test/TestResult";
import { useLoadingText } from "../../hooks/useLoadingText";
import "./TestPage.css";

export const TestPage = () => {
  const { language, duration, mode, currentText } = useSelector((state: RootState) => state.config);
  const { status, results } = useSelector((state: RootState) => state.test);

  useLoadingText(language);

  return (
    <div className="test-page">
      {status !== "finished" && (
        <>
          <TextConfig visibility={status === "idle"} />
          <TextContainer targetText={currentText} timeLimit={duration} mode={mode} />
        </>
      )}

      {results && <TestResult text={results.textData} stats={results.stats} />}
    </div>
  );
};
