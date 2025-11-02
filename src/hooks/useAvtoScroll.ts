import { useEffect, type RefObject } from "react";

export const useAutoScroll = (
  scrollContainerRef: RefObject<HTMLElement | null>,
  targetElementRef: RefObject<HTMLElement | null>,
  triggerDependency: number,
  lineHeight: number = 48
) => {
  useEffect(() => {
    const container = scrollContainerRef.current;
    const cursor = targetElementRef.current;

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
  }, [triggerDependency, lineHeight, scrollContainerRef, targetElementRef]);
};
