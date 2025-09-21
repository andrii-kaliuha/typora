import { useTranslation } from "react-i18next";
import { Navigation } from "./Navigation";
import "./Header.css";
import { useState, useEffect } from "react";

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
      <Navigation />
      <div className="buttons-container">
        <button onClick={toggleLanguage} type="button" className="theme-toggle-button">
          <svg id="language-icon">
            <use href="/icons.svg#language-icon" />
          </svg>
        </button>

        <ThemeToggle />
      </div>
    </header>
  );
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) return savedTheme;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    theme === "dark" ? document.body.classList.add("dark") : document.body.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button type="button" onClick={handleThemeToggle} className="theme-toggle-button">
      <svg id="theme-icon">
        <use href="/icons.svg#theme-icon" />
      </svg>
    </button>
  );
};
