import { useEffect, type RefObject } from "react";

type useAutoScrollProps = {
  textRef: RefObject<HTMLElement | null>;
  cursorRef: RefObject<HTMLElement | null>;
  textLength: number;
  lineHeight: number;
};

export const useAutoScroll = ({ textRef, cursorRef, textLength, lineHeight }: useAutoScrollProps) => {
  useEffect(() => {
    const container = textRef.current;
    const cursor = cursorRef.current;

    if (!container || !cursor) return;

    const containerRect = container.getBoundingClientRect();
    const cursorRect = cursor.getBoundingClientRect();

    const cursorRelativeTop = cursorRect.top - containerRect.top;

    // --- Прокручування ВНИЗ ---
    if (cursorRelativeTop > lineHeight * 1) {
      container.scrollTop += lineHeight;
      return;
    }

    // --- Прокручування ВГОРУ ---
    if (cursorRelativeTop < 0) {
      container.scrollTop -= lineHeight;
    }
  }, [textRef, cursorRef, textLength, lineHeight]);
};
