import { useRef } from "react";
import { useAutoScroll } from "../../hooks/useAvtoScroll";
import { TestControls } from "./TestControls";
import { useTestCompletion } from "../../hooks/useTestCompletion";
import { useTypingTest } from "../../hooks/useTypingTest";
import { useTextStructure } from "../../hooks/useTextStructure";
import type { TextContainerProps } from "../../types/types";
import { useTestKeyHandler } from "../../hooks/useTestKeyHandler";

const LINE_HEIGHT = 48;

export const TextContainer = ({ targetText, timeLimit, mode }: TextContainerProps) => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const { typedText, typedHistory, timeLeft, handleRestart, handleKeyDown, testStatus, startTimeRef } = useTypingTest({
    targetText,
    timeLimit,
    mode,
  });

  useTestKeyHandler({ textContainerRef, testStatus, handleKeyDown });
  useAutoScroll(textRef, cursorRef, typedText.length, LINE_HEIGHT);
  const textData = useTextStructure({ targetText, typedText, typedHistory });
  useTestCompletion({ typedHistory, targetText, testStatus, startTimeRef, timeLeft, textData });

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
