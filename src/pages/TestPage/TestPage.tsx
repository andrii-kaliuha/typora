import { TextConfig } from "../../components/TextConfig";
import { TextContainer } from "../../components/TextContainer";
import { TestResult } from "../../components/TestResult";
import "./TestPage.css";
import { getRandomText } from "../../utils/utils";
import type { RootState } from "../../store/index";
import { setRandomText } from "../../store/configSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const TestPage = () => {
  const dispatch = useDispatch();
  const { language, duration, mode, currentText } = useSelector((state: RootState) => state.config);
  const { status: testStatus, finalResults } = useSelector((state: RootState) => state.test);

  useEffect(() => {
    const initialRandomText = getRandomText(language);
    dispatch(setRandomText(initialRandomText));
  }, [language, dispatch]);

  return (
    <div className="test-page">
      {testStatus !== "finished" && (
        <>
          <TextConfig visibility={testStatus === "idle"} />
          <TextContainer targetText={currentText} timeLimit={duration} mode={mode} />
        </>
      )}

      {finalResults && <TestResult text={finalResults.textData} stats={finalResults.stats} />}
    </div>
  );
};
