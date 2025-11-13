import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import english from "./locales/i18n/english.json";
import ukrainian from "./locales/i18n/ukrainian.json";

const resources = {
  english: { translation: english },
  ukrainian: { translation: ukrainian },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "english",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
