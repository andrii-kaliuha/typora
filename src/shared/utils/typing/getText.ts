import type { Language } from "../../types/types";
import TEXT_POOL_UA from "../../localization/texts/ukrainian-texts.json";
import TEXT_POOL_EN from "../../localization/texts/english-texts.json";

const texts = { uk: TEXT_POOL_UA, en: TEXT_POOL_EN };

export const getRandomText = (language: Language = "en"): string => {
  const availableTexts = texts[language];
  if (!availableTexts || availableTexts.length === 0) return "";

  const randomIndex = Math.floor(Math.random() * availableTexts.length);
  return availableTexts[randomIndex];
};

export const getNewText = (currentText: string, language: Language = "en"): string => {
  const availableTexts = texts[language];
  if (!availableTexts || availableTexts.length === 0) return "";

  const filtered = availableTexts.filter((t) => t !== currentText);
  if (filtered.length === 0) return currentText;

  return filtered[Math.floor(Math.random() * filtered.length)];
};
