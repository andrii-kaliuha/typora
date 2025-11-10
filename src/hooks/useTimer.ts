import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import type { TestStatus } from "../types/types";

export type TimerTuple = [number, Dispatch<SetStateAction<number>>];

export const useTimer = (duration: number, status: TestStatus): TimerTuple => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (status !== "running" || timeLeft === 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [status, timeLeft]);

  return [timeLeft, setTimeLeft];
};
