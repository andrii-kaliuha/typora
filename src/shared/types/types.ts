export type MenuOptions = "text" | "language" | "duration" | "mode";
export type TextType = "random" | "custom";
export type Language = "uk" | "en";
export type Mode = "normal" | "accuracy" | "strict";
export type TestStatus = "idle" | "running" | "finished";

export type TestResultItem = { textData: Word[]; stats: Stats; id: string };

export type TypedHistoryEntry = { type: "char"; key: string; timestamp: number } | { type: "backspace"; timestamp: number };

export type Word = { letters: Letter[]; status: "correct" | "incorrect" | "untyped" };
export type Letter = {
  letter: string;
  status: "cursor" | "untyped" | "correct" | "incorrect";
  typedAt: number | null;
};
export type Stats = {
  wpm: number;
  accuracy: number;
  characters: { correctChars: number; incorrectChars: number; untypedChars: number };
  duration: number;
  mode: string;
  language: string;
  textType: string;
  date: number;
  typedHistory: TypedHistoryEntry[];
};

export type Option = { value: string; label: string };
export type StatItem = { label: string; value: string | number };
export type TestStatisticsProps = { stats: StatItem[] };

export type TextProps = {
  text: { letters: { letter: string; status: string; typedAt: number | null }[]; status: string }[];
  isReplaying: boolean;
  replayTypedText: string;
};

export type HistoryTestResultProps = {
  id: string;
  textData: { letters: { letter: string; status: string; typedAt: number | null }[]; status: string }[];
  stats: Stats;
};

export type TestResultProps = {
  text: { letters: { letter: string; status: string; typedAt: number | null }[]; status: string }[];
  stats: Stats;
};

export type TextContainerProps = { targetText: string; timeLimit: number; mode: Mode };
