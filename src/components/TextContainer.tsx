import { useState, useEffect, useRef } from "react";

type LetterData = { letter: string; status: "cursor" | "untyped" | "correct" | "incorrect"; typedAt: number | null };

type WordData = { letters: LetterData[]; status: "correct" | "untyped" | "incorrect" };

const getCharStatus = (char: string, index: number, typedText: string): string => {
  if (index === typedText.length) return "cursor";
  const typedChar = typedText[index];
  if (typedChar === undefined) return "untyped";
  return typedChar === char ? "correct" : "incorrect";
};

const getWordStatus = (letters: { status: string }[]): string => {
  if (letters.some((letter) => letter.status === "incorrect")) return "incorrect";
  if (letters.some((letter) => letter.status === "cursor" || letter.status === "untyped")) return "untyped";
  return "correct";
};

export const TextContainer = ({ targetText }: { targetText: string }) => {
  const [typedText, setTypedText] = useState("");

  const [typedHistory, setTypedHistory] = useState<[string, number][]>([]);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTypedText("");
    setTypedHistory([]);

    const handleKeyDown = (event: KeyboardEvent) => {
      const now = Date.now();

      if (event.key.length === 1) {
        event.preventDefault();
        setTypedText((prevTypedText) => prevTypedText + event.key);
        setTypedHistory((prevHistory) => [...prevHistory, [event.key, now]]);
      } else if (event.key === "Backspace") {
        event.preventDefault();
        setTypedText((prevTypedText) => prevTypedText.slice(0, -1));
        setTypedHistory((prevHistory) => prevHistory.slice(0, -1));
      }
    };

    const textContainer = textContainerRef.current;

    if (textContainer) {
      textContainer.addEventListener("keydown", handleKeyDown);
      textContainer.focus();

      return () => {
        textContainer.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [targetText]);

  // --- Крок 1: Обробка даних ---

  const wordsWithSpaces = targetText.match(/(\S+|\s)/g) || [];

  const textData: WordData[] = wordsWithSpaces.map((wordOrSpace, wordIndex) => {
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

  // --- Крок 2: Виведення даних для історії ---
  console.log("Масив даних:", textData);

  // --- Крок 3: Рендеринг ---
  return (
    <div className="text-container" ref={textContainerRef} tabIndex={0}>
      {textData.map((word, index) => (
        <span key={index}>
          {word.letters.map((item, index) => (
            <span key={index} className={item.status}>
              {item.letter}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
};
