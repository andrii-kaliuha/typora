import type { Stats, StatItem } from "../types/types";

export const formatStats = (rawStats: Stats): StatItem[] => {
  const { wpm, accuracy, characters, duration, date, mode, language, text } = rawStats;

  const statsArray: StatItem[] = [
    { label: "result.wpm", value: wpm },
    { label: "result.accuracy", value: accuracy },
    { label: "result.characters", value: `${characters.correctChars}/${characters.incorrectChars}/${characters.untypedChars}` },
    { label: "result.duration", value: duration },
    { label: "result.mode", value: `result.${mode}` },
  ];

  if (text !== "custom") statsArray.push({ label: "result.language", value: `result.${language}` });

  statsArray.push({ label: "result.text", value: `result.${text}-text` }, { label: "result.date", value: date });

  return statsArray;
};
