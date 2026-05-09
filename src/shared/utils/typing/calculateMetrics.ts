import type { TypedHistoryEntry } from "../../types/types";

type TestMetrics = { wpm: number; accuracy: number };

export const calculateMetrics = (typedHistory: TypedHistoryEntry[], targetText: string, timeElapsed: number): TestMetrics => {
  if (timeElapsed === 0) return { wpm: 0, accuracy: 0 };

  const charEvents = typedHistory.filter((e) => e.type === "char");
  const typedCharsCount = charEvents.length;

  let correctCharsCount = 0;

  let reconstructed = "";
  for (const entry of typedHistory) {
    if (entry.type === "char") reconstructed += entry.key;
    else if (entry.type === "backspace") reconstructed = reconstructed.slice(0, -1);
  }

  for (let i = 0; i < reconstructed.length; i++) {
    if (i < targetText.length && targetText[i] === reconstructed[i]) {
      correctCharsCount++;
    }
  }

  const wpm = typedCharsCount / 5 / (timeElapsed / 60);
  const accuracy = reconstructed.length > 0 ? (correctCharsCount / reconstructed.length) * 100 : 0;

  return { wpm, accuracy };
};
