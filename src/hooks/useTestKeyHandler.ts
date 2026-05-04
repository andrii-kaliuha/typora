import { useEffect, type RefObject } from "react";
import type { TestStatus } from "../types/types";

type UseTestKeyHandlerProps = {
  textContainerRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  testStatus: TestStatus;
  handleKeyDown: (event: KeyboardEvent) => void;
};

// export const useTestKeyHandler = ({ textContainerRef, inputRef, testStatus, handleKeyDown }: UseTestKeyHandlerProps) => {
//   useEffect(() => {
//     const textContainer = textContainerRef.current;
//     const input = inputRef.current;

//     if (testStatus === "running" || testStatus === "idle") {
//       input?.addEventListener("keydown", handleKeyDown);
//       input?.focus();
//       textContainer?.addEventListener("click", () => input?.focus());
//     }

//     return () => {
//       input?.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [testStatus, handleKeyDown, textContainerRef, inputRef]);
// };

export const useTestKeyHandler = ({ textContainerRef, inputRef, testStatus, handleKeyDown }: UseTestKeyHandlerProps) => {
  useEffect(() => {
    const textContainer = textContainerRef.current;
    const input = inputRef.current;

    const handleInput = (e: Event) => {
      const inputEvent = e as InputEvent;
      if (inputEvent.data) {
        const syntheticEvent = new KeyboardEvent("keydown", { key: inputEvent.data });
        handleKeyDown(syntheticEvent);
        if (input) input.value = "";
      }
    };

    const handleInputBackspace = (e: KeyboardEvent) => {
      if (e.key === "Backspace") handleKeyDown(e);
    };

    if (testStatus === "running" || testStatus === "idle") {
      input?.addEventListener("input", handleInput);
      input?.addEventListener("keydown", handleInputBackspace);
      input?.focus();
      textContainer?.addEventListener("click", () => input?.focus());
    }

    return () => {
      input?.removeEventListener("input", handleInput);
      input?.removeEventListener("keydown", handleInputBackspace);
    };
  }, [testStatus, handleKeyDown, textContainerRef, inputRef]);
};
