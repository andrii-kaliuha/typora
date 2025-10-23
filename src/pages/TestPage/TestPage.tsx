import { useState, useCallback } from "react";
import { TextConfig } from "../../components/TextConfig";
import { TextContainer } from "../../components/TextContainer";
import { TestResult } from "../../components/TestResult";
import "./TestPage.css";
import { getNewText, getRandomText } from "../../utils/utils";

type TestStatus = "idle" | "running" | "finished";
type TestMetrics = { wpm: number; accuracy: number };
type LetterData = { letter: string; status: string; typedAt: number | null };
type WordData = { letters: LetterData[]; status: string };
type StatItem = { label: string; value: string | number | Date };

type FinalResults = { textData: WordData[]; metrics: TestMetrics; stats: StatItem[] };
const TIME_LIMIT = 15;

export const TestPage = () => {
  const [testStatus, setTestStatus] = useState<TestStatus>("idle");
  const [finalResults, setFinalResults] = useState<FinalResults | null>(null);

  const [targetText, setTargetText] = useState(getRandomText());

  const handleTestComplete = useCallback((data: WordData[], metrics: TestMetrics) => {
    const statsForDisplay: StatItem[] = [
      { label: "result.wpm", value: metrics.wpm },
      { label: "result.accuracy", value: `${metrics.accuracy}%` },
      { label: "result.date", value: new Date() },
      // додати інші метрики
    ];

    // 2 Збереження результатів та оновлення статусу
    setFinalResults({ textData: data, metrics: metrics, stats: statsForDisplay });
    setTestStatus("finished");

    // 3 Збереження в глобальний Store (MobX/Redux)
    console.log("Тест завершено. Результати готові до збереження.");
  }, []);

  const handleRepeatTest = () => {
    setFinalResults(null);
    setTestStatus("idle");
  };

  const handleNextTest = () => {
    const newText = getNewText(targetText);
    setTargetText(newText);
    setFinalResults(null);
    setTestStatus("idle");
    console.log("Перехід до наступного тексту.");
  };

  const renderContent = () => {
    switch (testStatus) {
      case "finished":
        if (finalResults)
          return <TestResult text={finalResults.textData} stats={finalResults.stats} onRepeat={handleRepeatTest} onNext={handleNextTest} />;
        return null;

      case "idle":
      case "running":
      default:
        return (
          <>
            <TextConfig />
            <TextContainer targetText={targetText} timeLimit={TIME_LIMIT} onTestComplete={handleTestComplete} />
          </>
        );
    }
  };

  return <div className="test-page">{renderContent()}</div>;
};
