import { useEffect, type RefObject } from "react";

type useClickOutsideProps = { ref: RefObject<Node | null>; handler: () => void };

export const useClickOutside = ({ ref, handler }: useClickOutsideProps) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
