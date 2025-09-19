import { useTranslation } from "react-i18next";
import { Navigation } from "./Navigation";
import "./Header.css";

export const Header = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const language = i18n.language === "en" ? "uk" : "en";
    i18n.changeLanguage(language);
  };

  return (
    <header>
      <div className="logotype-container">
        <svg id="logotype-icon">
          <use href="/icons.svg#logotype-icon" />
        </svg>
        <p className="logotype-text">Typora</p>
      </div>
      <Navigation></Navigation>
      <div className="buttons-container">
        <button onClick={toggleLanguage} type="button" className="theme-toggle-button">
          <svg id="language-icon">
            <use href="/icons.svg#language-icon" />
          </svg>
        </button>

        <button type="button" className="theme-toggle-button">
          <svg id="theme-icon">
            <use href="/icons.svg#theme-icon" />
          </svg>
        </button>
      </div>
    </header>
  );
};
