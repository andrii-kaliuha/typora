import type { TextProps } from "../../types/types";

export const TextResult = ({ text, isReplaying, cursorIndex }: TextProps) => {
  let charIndex = 0;

  return (
    <div className="text" aria-hidden="true">
      {text.map((word, index) => (
        <span key={index}>
          {word.letters.map((item, index) => {
            const currentCharIndex = charIndex;
            charIndex++;

            let status = item.status;

            if (isReplaying) {
              if (currentCharIndex < cursorIndex) status = item.status;
              else if (currentCharIndex === cursorIndex) status = "cursor";
              else status = "untyped";
            }

            return (
              <span key={index} className={status}>
                {item.letter}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
};
