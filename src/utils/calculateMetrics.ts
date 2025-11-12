type TestMetrics = { wpm: number; accuracy: number };
type TypedHistoryEntry = [string, number];

export const calculateMetrics = (typedHistory: TypedHistoryEntry[], targetText: string, timeElapsed: number): TestMetrics => {
  if (timeElapsed === 0) return { wpm: 0, accuracy: 0 };

  const typedCharsCount = typedHistory.length;
  let correctCharsCount = 0;

  const wpm = typedCharsCount / 5 / (timeElapsed / 60);

  for (let i = 0; i < typedCharsCount; i++) {
    if (i < targetText.length && targetText[i] === typedHistory[i][0]) {
      correctCharsCount++;
    }
  }

  const accuracy = typedCharsCount > 0 ? (correctCharsCount / typedCharsCount) * 100 : 0;

  return { wpm, accuracy };
};
