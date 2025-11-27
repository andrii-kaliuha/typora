import { useEffect, type RefObject } from "react";

export const useClickOutside = (ref: RefObject<Node | null>, handler: () => void) => {
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

// useEffect(() => {
//   const onClick = (e: MouseEvent) => {
//     if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
//       setOpen(false);
//     }
//   };

//   document.addEventListener("mousedown", onClick);
//   return () => document.removeEventListener("mousedown", onClick);
// }, []);
