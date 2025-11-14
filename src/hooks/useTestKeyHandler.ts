import { useEffect, type RefObject } from "react";
import type { TestStatus } from "../types/types";

type UseTestKeyHandlerProps = {
  textContainerRef: RefObject<HTMLDivElement | null>;
  testStatus: TestStatus;
  handleKeyDown: (event: KeyboardEvent) => void;
};

export const useTestKeyHandler = ({ textContainerRef, testStatus, handleKeyDown }: UseTestKeyHandlerProps) => {
  useEffect(() => {
    const textContainer = textContainerRef.current;

    if (textContainer) {
      if (testStatus === "running" || testStatus === "idle") {
        textContainer.addEventListener("keydown", handleKeyDown);
        textContainer.focus();
      }

      return () => {
        textContainer.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [testStatus, handleKeyDown, textContainerRef]);
};
