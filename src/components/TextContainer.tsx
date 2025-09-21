import "./TestPage.css";
import { useState, useEffect } from "react";

export const TextContainer = ({ text }: { text: string }) => {
  const [targetText] = useState(text);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Обробка тільки символів
      if (event.key.length === 1) {
        setTypedText((prevTypedText) => {
          const nextChar = targetText[prevTypedText.length];
          const isCorrect = event.key === nextChar;
          // Тут можна зберігати історію натискань з датою
          const timestamp = new Date();
          console.log(`Key: ${event.key}, Статус: ${isCorrect}, Timestamp: ${timestamp}`);
          return prevTypedText + event.key;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [targetText]);

  return (
    <div className="text-container">
      {targetText.split("").map((char, index) => {
        let charStatus: string;

        if (index === typedText.length) {
          charStatus = "cursor";
        } else if (typedText[index] === undefined) {
          charStatus = "untyped";
        } else if (typedText[index] === char) {
          charStatus = "correct";
        } else {
          charStatus = "incorrect";
        }

        return (
          <span key={index} className={charStatus}>
            {char}
          </span>
        );
      })}
    </div>
  );
};
