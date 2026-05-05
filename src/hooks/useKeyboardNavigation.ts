import { useEffect, useCallback, type RefObject } from "react";

type useSelectKeyboardNavigationProps = {
  wrapperRef: RefObject<HTMLElement | null>;
  menuRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

export const useSelectKeyboardNavigation = ({ wrapperRef, menuRef, isOpen, setOpen }: useSelectKeyboardNavigationProps) => {
  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);

        if (wrapperRef.current) {
          const controlButton = wrapperRef.current.querySelector("button");
          controlButton?.focus();
        }
      }
    },
    [setOpen, wrapperRef],
  );

  const handleArrowKey = useCallback(
    (e: KeyboardEvent) => {
      if (!menuRef.current) return;

      const options = Array.from(menuRef.current.querySelectorAll('[role="option"]')) as HTMLElement[];
      if (options.length === 0) return;

      const focusedIndex = options.findIndex((option) => option === document.activeElement);

      let nextIndex = -1;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        nextIndex = focusedIndex < options.length - 1 ? focusedIndex + 1 : 0;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        nextIndex = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
      }

      if (nextIndex !== -1) {
        options[nextIndex].focus();
      }
    },
    [menuRef],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("keydown", handleArrowKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("keydown", handleArrowKey);
    };
  }, [isOpen, handleEscapeKey, handleArrowKey]);
};
