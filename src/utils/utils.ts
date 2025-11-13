import type { Language, TestResultItem } from "../types/types";
import TEXT_POOL_UA from "../locales/texts/ukrainian-texts.json";
import TEXT_POOL_EN from "../locales/texts/english-texts.json";

const texts = { ukrainian: TEXT_POOL_UA, english: TEXT_POOL_EN };

export const getRandomText = (language: Language = "ukrainian"): string => {
  const availableTexts = texts[language];
  if (!availableTexts || availableTexts.length === 0) return "";

  const randomIndex = Math.floor(Math.random() * availableTexts.length);
  return availableTexts[randomIndex];
};

export const getNewText = (currentText: string, language: Language = "ukrainian"): string => {
  const availableTexts = texts[language];
  if (!availableTexts || availableTexts.length === 0) return "";

  const currentIndex = availableTexts.indexOf(currentText);

  if (currentIndex === -1) return getRandomText(language);

  const nextIndex = (currentIndex + 1) % availableTexts.length;

  return availableTexts[nextIndex];
};

export const getCharStatus = (char: string, index: number, typedText: string): string => {
  if (index === typedText.length) return "cursor";
  const typedChar = typedText[index];
  if (typedChar === undefined) return "untyped";
  return typedChar === char ? "correct" : "incorrect";
};

export const getWordStatus = (letters: { status: string }[]): string => {
  if (letters.some((letter) => letter.status === "incorrect")) return "incorrect";
  if (letters.some((letter) => letter.status === "cursor" || letter.status === "untyped")) return "untyped";
  return "correct";
};

export const getFileName = (unixTimestamp: number | undefined): string => {
  if (unixTimestamp === undefined) return "test-result";

  const date = new Date(unixTimestamp);

  const pad = (num: number) => String(num).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  const datePart = `${year}-${month}-${day}`;

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  const timePart = `${hours}-${minutes}-${seconds}`;

  return `test-result ${datePart} ${timePart}`;
};

export const loadHistory = (): TestResultItem[] => {
  try {
    const data = localStorage.getItem("typing_history");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveHistory = (history: TestResultItem[]) => localStorage.setItem("typing_history", JSON.stringify(history));
