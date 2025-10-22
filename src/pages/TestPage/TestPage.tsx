import { historyList } from "../../utils/historyList";
import { useState } from "react";
import { TextConfig } from "../../components/TextConfig";
import { TextContainer } from "../../components/TextContainer";
import { TestResult } from "../../components/TestResult";
import "./TestPage.css";

export const TestPage = () => {
  const text =
    "Вона повільно йшла по вулиці, освітленій лише ліхтарями. Повітря було наповнене ароматом дощу і свіжої землі. У її руках була стара, потерта книга, яку вона читала вже втретє. Кожна сторінка повертала її в інший світ, де проблеми";

  const [isTestRunning, setIsTestRunning] = useState(false);

  const handleToggleTestState = () => setIsTestRunning(!isTestRunning);

  return (
    <div className="test-page">
      <button type="button" style={{ position: "fixed", bottom: 50, left: 50 }} onClick={handleToggleTestState}>
        переключити
      </button>

      {isTestRunning === true ? (
        <TestResult text={historyList[0].text} stats={historyList[0].stats} showFullButtons={true} />
      ) : (
        <>
          <TextConfig />
          <TextContainer targetText={text} />
        </>
      )}
    </div>
  );
};
