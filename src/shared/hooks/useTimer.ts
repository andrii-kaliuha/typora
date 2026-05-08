import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import type { TestStatus } from "../types/types";

type TimerTuple = [number, Dispatch<SetStateAction<number>>];

export const useTimer = (duration: number, status: TestStatus): TimerTuple => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (status !== "running") return;

    let timerId: ReturnType<typeof setInterval> | null = null;

    timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          if (timerId) clearInterval(timerId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [status]);

  return [timeLeft, setTimeLeft];
};
