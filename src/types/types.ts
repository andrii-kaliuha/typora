import type { RefObject } from "react";

export type MenuOptions = "text" | "language" | "duration" | "mode";
export type TextType = "random" | "custom";
export type Language = "uk" | "en";
export type Mode = "normal" | "accuracy" | "strict";
export type TestStatus = "idle" | "running" | "finished";

export type StatItem = { label: string; value: string | number };

export type TestResultItem = { textData: Word[]; stats: Stats; id: string };

export type TestState = { status: TestStatus; finalResults: TestResultItem | null };

export type Letter = { letter: string; status: string; typedAt: number | null };
export type Word = { letters: Letter[]; status: string };

export type WordData = { letters: any[]; status: "correct" | "incorrect" | "untyped" };
export type LetterData = { letter: string; status: "cursor" | "untyped" | "correct" | "incorrect"; typedAt: number | null };
export type TypedHistoryEntry = [string, number];

export type Stats = {
  wpm: number;
  accuracy: number;
  characters: { correctChars: number; incorrectChars: number; untypedChars: number };
  duration: number;
  mode: string;
  language: string;
  textType: string;
  date: number;
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

export type TextProps = {
  text: { letters: { letter: string; status: string; typedAt: number | null }[]; status: string }[];
  isReplaying: boolean;
  cursorIndex: number;
};

export type UseTestCompletionProps = {
  typedHistory: TypedHistoryEntry[];
  targetText: string;
  testStatus: TestStatus;
  startTimeRef: RefObject<number | null>;
  timeLeft: number;
  textData: WordData[];
};

export type TextContainerProps = { targetText: string; timeLimit: number; mode: Mode };
export type TestStatisticsProps = { stats: StatItem[] };
