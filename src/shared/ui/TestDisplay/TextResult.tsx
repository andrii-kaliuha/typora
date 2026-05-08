import type { TextProps } from "../../types/types";
import { getCharStatus } from "../../utils/typing/getStatus";

export const TextResult = ({ text, isReplaying, replayTypedText }: TextProps) => {
  let charIndex = 0;

  return (
    <div className="text" aria-hidden="true">
      {text.map((word, index) => (
        <span key={index} className="word">
          {word.letters.map((item, letterIndex) => {
            const currentCharIndex = charIndex;
            charIndex++;

            const status = isReplaying ? getCharStatus(item.letter, currentCharIndex, replayTypedText) : item.status;

            return (
              <span key={letterIndex} className={status}>
                {item.letter === " " ? "\u00A0" : item.letter}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
};
