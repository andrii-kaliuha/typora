import { useRef, useEffect, useMemo } from "react";
import { useAutoScroll } from "../hooks/useAvtoScroll";
import { TestControls } from "../shared/TestControls";
import { getCharStatus, getWordStatus } from "../utils/utils";
import { useTestCompletion } from "../hooks/useTestCompletion";
import { useTypingTest } from "../hooks/useTypingTest";
import type { LetterData, Mode, WordData } from "../types/types";

type TextContainerProps = { targetText: string; timeLimit: number; mode: Mode };

const LINE_HEIGHT = 48;

export const TextContainer = ({ targetText, timeLimit, mode }: TextContainerProps) => {
  // 1. Використання useTypingTest

  const { typedText, typedHistory, timeLeft, handleRestart, handleKeyDown, testStatus, startTimeRef } = useTypingTest({
    targetText,
    timeLimit,
    mode,
  });

  // 2. Логіка завершення
  const { finishTest } = useTestCompletion({ typedHistory, targetText, testStatus, startTimeRef });

  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (testStatus === "idle") handleRestart();
  }, [targetText, timeLimit]);

  // 3. Логіка для приєднання/від'єднання слухача

  useEffect(() => {
    const textContainer = textContainerRef.current;

    if (textContainer) {
      if (testStatus === "running" || testStatus === "idle") {
        textContainer.addEventListener("keydown", handleKeyDown);
        textContainer.focus();
      }

      return () => {
        textContainer.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [testStatus, handleKeyDown]);

  // 4. Використання useAutoScroll

  useAutoScroll(textRef, cursorRef, typedText.length, LINE_HEIGHT);

  // 5. Обробка тексту

  const textData: WordData[] = useMemo(() => {
    const words = targetText.match(/\S+/g) || [];

    return words.map((word, wordIndex) => {
      const startIndex = words.slice(0, wordIndex).reduce((sum, w) => sum + w.length + 1, 0);

      const lettersData: LetterData[] = word.split("").map((char, charIndex) => {
        const globalIndex = startIndex + charIndex;
        const status = getCharStatus(char, globalIndex, typedText);
        const typedAt = typedHistory[globalIndex] ? typedHistory[globalIndex][1] : null;

        return {
          letter: char,
          status: status as LetterData["status"],
          typedAt: typedAt,
        };
      });

      const isLastWord = wordIndex === words.length - 1;
      if (!isLastWord) {
        const spaceIndex = startIndex + word.length;
        lettersData.push({
          letter: " ",
          status: getCharStatus(" ", spaceIndex, typedText) as LetterData["status"],
          typedAt: typedHistory[spaceIndex] ? typedHistory[spaceIndex][1] : null,
        });
      }

      const wordStatus = getWordStatus(lettersData) as WordData["status"];

      return {
        letters: lettersData,
        status: wordStatus,
      };
    });
  }, [targetText, typedText, typedHistory]);

  // 6. Умова Завершення: Набрано весь текст

  const isTextFullyTyped = typedText.length === targetText.length && textData.every((word) => word.status === "correct");

  useEffect(() => {
    if (testStatus === "running" && (timeLeft === 0 || isTextFullyTyped)) finishTest(textData);
  }, [timeLeft, isTextFullyTyped, testStatus, textData, finishTest]);

  // 7. Рендеринг

  return (
    <div className="text-container">
      <div className="text-wrapper" ref={textContainerRef} tabIndex={0}>
        <div className="text" ref={textRef} tabIndex={-1}>
          {textData.map((word, index) => (
            <span key={index} className="word">
              {word.letters.map((item, index) => {
                const isCursor = item.status === "cursor";

                return (
                  <span key={index} ref={isCursor ? cursorRef : null} className={`letter ${item.status}`}>
                    {item.letter === " " ? "\u00A0" : item.letter}
                  </span>
                );
              })}
            </span>
          ))}
        </div>
      </div>

      <TestControls timeLeft={timeLeft} onRestart={handleRestart} />
    </div>
  );
};
