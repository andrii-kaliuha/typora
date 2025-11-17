import type { Language } from "../../types/types";
import TEXT_POOL_UA from "../../locales/texts/ukrainian-texts.json";
import TEXT_POOL_EN from "../../locales/texts/english-texts.json";

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
