import { useState, useCallback, useEffect, useMemo } from "react";
import { TextConfig } from "../../components/TextConfig";
import { TextContainer } from "../../components/TextContainer";
import { TestResult } from "../../components/TestResult";
import "./TestPage.css";
import { getNewText, getRandomText } from "../../utils/utils";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/index";

type TestStatus = "idle" | "running" | "finished";
type TestMetrics = { wpm: number; accuracy: number };
type LetterData = { letter: string; status: string; typedAt: number | null };
type WordData = { letters: LetterData[]; status: string };
type StatItem = { label: string; value: string | number | Date };

type FinalResults = { textData: WordData[]; metrics: TestMetrics; stats: StatItem[] };

export const TestPage = () => {
  const { language, duration, textType, customText } = useSelector((state: RootState) => state.config);

  const [testStatus, setTestStatus] = useState<TestStatus>("idle");
  const [finalResults, setFinalResults] = useState<FinalResults | null>(null);

  // 3. Обчислюємо targetText за допомогою useMemo
  const initialText = useMemo(() => {
    if (textType === "custom" && customText && customText.trim().length > 0) return customText;
    return getRandomText(language);
  }, [textType, customText, language]);

  // 4. Оновлюємо targetText при зміні initialText
  useEffect(() => {
    setTargetText(initialText);
  }, [initialText]);

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

  const baseText = useMemo(() => {
    if (textType === "custom" && customText && customText.trim().length > 0) return customText;
    return getRandomText(language);
  }, [textType, customText, language]);

  const [targetText, setTargetText] = useState(baseText);

  useEffect(() => {
    if (targetText !== baseText) {
      setTargetText(baseText);
      setTestStatus("idle");
      setFinalResults(null);
    }
  }, [baseText, targetText]);

  const handleNextTest = useCallback(() => {
    setFinalResults(null);
    setTestStatus("idle");

    if (textType === "random") {
      const newText = getNewText(targetText, language);
      setTargetText(newText);
    } else setTargetText(baseText);
  }, [targetText, language, textType, baseText]);

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
            <TextContainer targetText={targetText} timeLimit={duration} onTestComplete={handleTestComplete} />
          </>
        );
    }
  };

  return <div className="test-page">{renderContent()}</div>;
};
