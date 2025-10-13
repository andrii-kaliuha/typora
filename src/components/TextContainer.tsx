import "./TestPage.css";
import { useState, useEffect, useRef } from "react";

export const TextContainer = ({ text }: { text: string }) => {
  const [targetText] = useState(text);
  const [typedText, setTypedText] = useState("");

  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.length === 1) {
        setTypedText((prevTypedText) => {
          event.preventDefault();

          return prevTypedText + event.key;
        });
      } else if (event.key === "Backspace") {
        event.preventDefault();
        setTypedText((prevTypedText) => prevTypedText.slice(0, -1));
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

  return (
    <div className="text-container" ref={textContainerRef} tabIndex={1}>
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
