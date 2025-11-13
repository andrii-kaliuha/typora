import type { Stats, StatItem } from "../types/types";

export const formatStats = (rawStats: Stats): StatItem[] => {
  const { wpm, accuracy, characters, duration, mode, language, text, date } = rawStats;

  const stats: StatItem[] = [
    { label: "result.wpm", value: wpm },
    { label: "result.accuracy", value: accuracy },
    { label: "result.characters", value: `${characters.correctChars}/${characters.incorrectChars}/${characters.untypedChars}` },
    { label: "result.duration", value: duration },
    { label: "result.mode", value: `result.${mode}` },
  ];

  if (text !== "custom") stats.push({ label: "result.language", value: `result.${language}` });

  stats.push({ label: "result.text", value: `result.${text}-text` }, { label: "result.date", value: date });

  return stats;
};
