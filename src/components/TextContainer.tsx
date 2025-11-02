import { useRef, useEffect, useMemo } from "react";
import { useTypingTest } from "../hooks/useTypingTest";
import { useAutoScroll } from "../hooks/useAvtoScroll";
import { TestControls } from "../shared/TestControls";
import { getCharStatus, getWordStatus } from "../utils/utils";

type LetterData = { letter: string; status: "cursor" | "untyped" | "correct" | "incorrect"; typedAt: number | null };
type WordData = { letters: LetterData[]; status: "correct" | "untyped" | "incorrect" };
type Mode = "normal" | "accuracy" | "strict";
type TextContainerProps = { targetText: string; timeLimit: number; mode: Mode };

const LINE_HEIGHT = 48;

export const TextContainer = ({ targetText, timeLimit, mode }: TextContainerProps) => {
  // 1. Використання useTypingTest

  const { typedText, typedHistory, testStatus, timeLeft, handleRestart, handleKeyDown, finishTest } = useTypingTest({
    targetText,
    timeLimit,
    mode,
  });

  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (testStatus === "idle") handleRestart();
  }, [targetText, timeLimit]);

  // 2. Логіка для приєднання/від'єднання слухача

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

  // 3. Використання useAutoScroll

  useAutoScroll(textRef, cursorRef, typedText.length, LINE_HEIGHT);

  // 4. Обробка тексту

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

  // 5. Умова Завершення: Набрано весь текст

  const isTextFullyTyped = typedText.length === targetText.length && textData.every((word) => word.status === "correct");

  useEffect(() => {
    if (testStatus === "running" && (timeLeft === 0 || isTextFullyTyped)) finishTest(textData);
  }, [timeLeft, isTextFullyTyped, testStatus, textData, finishTest]);

  // 6. Рендеринг

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
