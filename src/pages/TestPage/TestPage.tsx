import { useSelector } from "react-redux";
import type { RootState } from "../../store/index";
import { TestConfig } from "../../features/test-config/TestConfig";
import { TextContainer } from "../../features/typing-test/TextContainer";
import { TestResult } from "../../features/test-result/TestResult";
import { useLoadingText } from "../../shared/hooks/useLoadingText";
import "./TestPage.css";

export const TestPage = () => {
  const { language, duration, mode, currentText } = useSelector((state: RootState) => state.config);
  const { status, results } = useSelector((state: RootState) => state.test);

  useLoadingText(language);

  return (
    <div className="test-page">
      {status !== "finished" && (
        <>
          <TestConfig visibility={status === "idle"} />
          <TextContainer targetText={currentText} timeLimit={duration} mode={mode} />
        </>
      )}

      {results && <TestResult text={results.textData} stats={results.stats} />}
    </div>
  );
};
