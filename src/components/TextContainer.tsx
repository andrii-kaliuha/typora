import { useRef, useEffect, useMemo } from "react";
import { useTypingTest } from "../hooks/useTypingTest";
import { TestControls } from "../shared/TestControls";
import { getCharStatus, getWordStatus } from "../utils/utils";

type LetterData = { letter: string; status: "cursor" | "untyped" | "correct" | "incorrect"; typedAt: number | null };
type WordData = { letters: LetterData[]; status: "correct" | "untyped" | "incorrect" };
type TestMetrics = { wpm: number; accuracy: number };
type Mode = "normal" | "accuracy" | "strict";
type TextContainerProps = {
  targetText: string;
  timeLimit: number;
  onTestComplete: (data: WordData[], metrics: TestMetrics) => void;
  onTestStart: () => void;
  mode: Mode;
};

export const TextContainer = ({ targetText, timeLimit, onTestComplete, onTestStart, mode }: TextContainerProps) => {
  // 1. Використовуємо хук для всієї логіки стану та введення
  const { typedText, typedHistory, testStatus, timeLeft, handleRestart, handleKeyDown, finishTest } = useTypingTest({
    targetText,
    timeLimit,
    onTestComplete,
    onTestStart,
    mode,
  });

  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (testStatus !== "finished") handleRestart();
  }, [timeLimit]);

  // 2. Логіка для приєднання/від'єднання слухача
  useEffect(() => {
    const textContainer = textContainerRef.current;

    if (textContainer) {
      textContainer.addEventListener("keydown", handleKeyDown);
      textContainer.focus();

      return () => {
        textContainer.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [testStatus, handleKeyDown]);

  // 3. Обробка тексту

  const textData: WordData[] = useMemo(() => {
    const wordsWithSpaces = targetText.match(/(\S+|\s)/g) || [];

    return wordsWithSpaces.map((wordOrSpace, wordIndex) => {
      const startIndex = wordsWithSpaces.slice(0, wordIndex).join("").length;

      const lettersData: LetterData[] = wordOrSpace.split("").map((char, charIndex) => {
        const globalIndex = startIndex + charIndex;
        const status = getCharStatus(char, globalIndex, typedText);

        const typedAt = typedHistory[globalIndex] ? typedHistory[globalIndex][1] : null;

        return {
          letter: char,
          status: status as LetterData["status"],
          typedAt: typedAt,
        };
      });

      const wordStatus = getWordStatus(lettersData) as WordData["status"];

      return {
        letters: lettersData,
        status: wordStatus,
      };
    });
  }, [targetText, typedText, typedHistory]);

  // 4. Умова Завершення: Набрано весь текст

  const isTextFullyTyped = typedText.length === targetText.length && textData.every((word) => word.status === "correct");

  useEffect(() => {
    if (testStatus === "running" && (timeLeft === 0 || isTextFullyTyped)) finishTest(textData);
  }, [timeLeft, isTextFullyTyped, testStatus, textData, finishTest]);

  // 5. Рендеринг
  return (
    <div className="text-container">
      <div className="text-wrapper" ref={textContainerRef} tabIndex={0}>
        <div className="text">
          {textData.map((word, index) => (
            <span key={index} className="word">
              {word.letters.map((item, index) => (
                <span key={index} className={`letter ${item.status}`}>
                  {item.letter}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <TestControls timeLeft={timeLeft} onRestart={handleRestart} />
    </div>
  );
};
