type TextProps = {
  text: { letters: { letter: string; status: string; typedAt: number | null }[]; status: string }[];
  isReplaying: boolean;
  replayCharIndex: number;
};

export const TextResult = ({ text, isReplaying, replayCharIndex }: TextProps) => {
  let typedCount = 0;

  return (
    <div className="text">
      {text.map((word, index) => (
        <span key={index}>
          {word.letters.map((item, charIndex) => {
            const charGlobalIndex = typedCount;
            typedCount++;

            let statusClass = item.status;

            if (isReplaying) {
              if (charGlobalIndex < replayCharIndex) statusClass = item.status;
              else if (charGlobalIndex === replayCharIndex) statusClass = "cursor";
              else statusClass = "untyped";
            }

            const finalClass = isReplaying ? statusClass : item.status;

            return (
              <span key={charIndex} className={finalClass}>
                {item.letter}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
};
