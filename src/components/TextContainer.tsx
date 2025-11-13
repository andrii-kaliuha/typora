import { useRef, useEffect } from "react";
import { useAutoScroll } from "../hooks/useAvtoScroll";
import { TestControls } from "../shared/TestControls";
import { useTestCompletion } from "../hooks/useTestCompletion";
import { useTypingTest } from "../hooks/useTypingTest";
import { useTextStructure } from "../hooks/useTextStructure";
import type { Mode } from "../types/types";

export type TextContainerProps = { targetText: string; timeLimit: number; mode: Mode };

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

  const textData = useTextStructure({ targetText, typedText, typedHistory });

  // 6. Умова Завершення: Набрано весь текст

  const isTextFullyTyped = typedText.length === targetText.length && textData.every((word) => word.status !== "untyped");

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
