import { useEffect, type RefObject } from "react";
import type { TestStatus } from "../types/types";

type UseTestKeyHandlerProps = {
  textContainerRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  testStatus: TestStatus;
  handleKeyDown: (event: KeyboardEvent) => void;
};

export const useTestKeyHandler = ({ textContainerRef, inputRef, testStatus, handleKeyDown }: UseTestKeyHandlerProps) => {
  useEffect(() => {
    const textContainer = textContainerRef.current;
    const input = inputRef.current;

    if (testStatus === "running" || testStatus === "idle") {
      input?.addEventListener("keydown", handleKeyDown);
      input?.focus();
      textContainer?.addEventListener("click", () => input?.focus());
    }

    return () => {
      input?.removeEventListener("keydown", handleKeyDown);
    };
  }, [testStatus, handleKeyDown, textContainerRef, inputRef]);
};
