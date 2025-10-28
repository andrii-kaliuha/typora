import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextConfig } from "../../components/TextConfig";
import { TextContainer } from "../../components/TextContainer";
import { TestResult } from "../../components/TestResult";
import "./TestPage.css";
import { getNewText, getRandomText } from "../../utils/utils";
import type { RootState } from "../../store/index";
import { setRandomText } from "../../store/configSlice";

type TestStatus = "idle" | "running" | "finished";
type TestMetrics = { wpm: number; accuracy: number };
type LetterData = { letter: string; status: string; typedAt: number | null };
type WordData = { letters: LetterData[]; status: string };
type StatItem = { label: string; value: string | number | Date };

type FinalResults = { textData: WordData[]; metrics: TestMetrics; stats: StatItem[] };

export const TestPage = () => {
  const dispatch = useDispatch();
  const { textType, language, duration, mode, currentText } = useSelector((state: RootState) => state.config);

  const [testStatus, setTestStatus] = useState<TestStatus>("idle");
  const [finalResults, setFinalResults] = useState<FinalResults | null>(null);

  const handleTestComplete = useCallback(
    (data: WordData[], metrics: TestMetrics) => {
      // 1. Обчислення додаткових метрик з data
      let correctChars = 0;
      let incorrectChars = 0;
      let untypedChars = 0;
      let correctWords = 0;

      data.forEach((word) => {
        if (word.status === "correct") correctWords++;

        word.letters.forEach((letter) => {
          if (letter.status === "correct") correctChars++;
          else if (letter.status === "incorrect") incorrectChars++;
          else if (letter.status === "untyped") untypedChars++;
        });
      });

      const statsForDisplay: StatItem[] = [
        // Метрики з хука useTypingTest
        { label: "result.wpm", value: metrics.wpm },
        { label: "result.accuracy", value: `${metrics.accuracy}%` },

        // Нові обчислені метрики
        { label: "result.characters", value: `${correctChars}/${incorrectChars}/${untypedChars}` },

        // Налаштування тесту (взяті з Redux)
        { label: "result.duration", value: duration },
        { label: "result.mode", value: `result.${mode}` },
        { label: "result.language", value: `result.${language}` },
        { label: "result.text", value: `result.${textType}-text` },

        // Дата завершення
        { label: "result.date", value: new Date() },
      ];

      // 2. Збереження результатів та оновлення статусу
      setFinalResults({ textData: data, metrics: metrics, stats: statsForDisplay });
      setTestStatus("finished");

      // 3. Збереження в глобальний Redux Store
      console.log("Збереження в глобальний Redux Store");
    },
    [duration, mode, language, textType]
  );

  const handleRepeatTest = () => {
    setFinalResults(null);
    setTestStatus("idle");
  };

  useEffect(() => {
    const initialRandomText = getRandomText(language);
    dispatch(setRandomText(initialRandomText));
  }, [language, dispatch]);

  const handleNextTest = useCallback(() => {
    setFinalResults(null);
    setTestStatus("idle");

    if (textType === "random") {
      const newRandomText = getNewText(currentText, language);
      dispatch(setRandomText(newRandomText));
    }
  }, [currentText, language, textType, dispatch]);

  const handleTestStart = useCallback(() => {
    setTestStatus("running");
  }, []);

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
            <TextConfig visibility={testStatus === "running" ? false : true} />
            <TextContainer
              targetText={currentText}
              timeLimit={duration}
              onTestComplete={handleTestComplete}
              onTestStart={handleTestStart}
              mode={mode}
            />
          </>
        );
    }
  };

  return <div className="test-page">{renderContent()}</div>;
};
