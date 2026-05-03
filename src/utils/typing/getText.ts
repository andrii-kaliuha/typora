import type { Language } from "../../types/types";
import TEXT_POOL_UA from "../../localization/texts/ukrainian-texts.json";
import TEXT_POOL_EN from "../../localization/texts/english-texts.json";

const texts = { uk: TEXT_POOL_UA, en: TEXT_POOL_EN };

export const getRandomText = (language: Language = "uk"): string => {
  const availableTexts = texts[language];
  if (!availableTexts || availableTexts.length === 0) return "";

  const randomIndex = Math.floor(Math.random() * availableTexts.length);
  return availableTexts[randomIndex];
};

export const getNewText = (currentText: string, language: Language = "uk"): string => {
  const availableTexts = texts[language];
  if (!availableTexts || availableTexts.length === 0) return "";

  const currentIndex = availableTexts.indexOf(currentText);

  if (currentIndex === -1) return getRandomText(language);

  const nextIndex = (currentIndex + 1) % availableTexts.length;

  return availableTexts[nextIndex];
};
