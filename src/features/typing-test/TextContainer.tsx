import { useRef } from "react";
import { useAutoScroll } from "../../shared/hooks/useAvtoScroll";
import { TestControls } from "./TestControls";
import { useTestCompletion } from "../../shared/hooks/useTestCompletion";
import { useTypingTest } from "../../shared/hooks/useTypingTest";
import { useTextStructure } from "../../shared/hooks/useTextStructure";
import type { TextContainerProps } from "../../shared/types/types";
import { useTestKeyHandler } from "../../shared/hooks/useTestKeyHandler";
import { useTranslation } from "react-i18next";
import "./TextContainer.css";

const LINE_HEIGHT = 48;

export const TextContainer = ({ targetText, timeLimit, mode }: TextContainerProps) => {
  const { t } = useTranslation();
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { typedText, typedHistory, timeLeft, handleRestart, handleKeyDown, testStatus, startTimeRef } = useTypingTest({
    targetText,
    timeLimit,
    mode,
  });

  useTestKeyHandler({ textContainerRef, inputRef, testStatus, handleKeyDown });
  useAutoScroll({ textRef, cursorRef, textLength: typedText.length, lineHeight: LINE_HEIGHT });
  const textData = useTextStructure({ targetText, typedText, typedHistory });
  useTestCompletion({ typedHistory, targetText, testStatus, startTimeRef, timeLeft, textData });

  return (
    <div className="text-container">
      <div className="text-wrapper" ref={textContainerRef} tabIndex={0}>
        <input
          ref={inputRef}
          className="hidden-input"
          name="hidden-input"
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label={t("test.typing-area")}
        />
        <div className="text" ref={textRef} tabIndex={-1}>
          {textData.map((word, index) => (
            <span key={index}>
              {word.letters.map((item, index) => {
                const isCursor = item.status === "cursor";

                return (
                  <span key={index} ref={isCursor ? cursorRef : null} className={item.status}>
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
