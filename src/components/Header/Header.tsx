import { useTranslation } from "react-i18next";
import { Navigation } from "./Navigation";
import "./Header.css";
import { useState, useEffect } from "react";

export const Header = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const language = i18n.language === "english" ? "ukrainian" : "english";
    i18n.changeLanguage(language);
  };

  return (
    <header>
      <div className="logotype-container">
        <svg id="logotype-icon">
          <use href="./src/assets/icons.svg#logotype-icon" />
        </svg>
        <p className="logotype-text">Typora</p>
      </div>
      <Navigation />
      <div className="buttons-container">
        <button onClick={toggleLanguage} type="button" className="language-select-button">
          <svg id="language-icon" width={32} height={32}>
            <use href="./src/assets/icons.svg#language-icon" />
          </svg>
        </button>
        <ThemeToggle />
      </div>
      <MobileMenuButton />
    </header>
  );
};

const MobileMenuButton = () => {
  // const toogleMenu = () => {};

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpen = () => setIsMenuOpen(true);
  const handleClose = () => setIsMenuOpen(false);

  return (
    <>
      <button onClick={handleOpen} type="button" className="toggle-menu-button">
        <svg width={32} height={32}>
          <use href="./src/assets/icons.svg#menu-icon" />
        </svg>
      </button>

      <MobileMenu isOpen={isMenuOpen} onClose={handleClose} />
    </>
  );
};

type MobileMenuProps = { isOpen: boolean; onClose: () => void };

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const language = i18n.language === "english" ? "ukrainian" : "english";
    i18n.changeLanguage(language);
  };

  if (!isOpen) return null;

  return (
    <div className="menu-backdrop">
      <div className="menu-container">
        <div className="logotype-container">
          <svg id="logotype-icon">
            <use href="./src/assets/icons.svg#logotype-icon" />
          </svg>
          <p className="logotype-text">Typora</p>
        </div>
        <Navigation onClose={onClose} />
        <div className="buttons-container">
          <button onClick={toggleLanguage} type="button" className="language-select-button">
            <svg id="language-icon" width={32} height={32}>
              <use href="./src/assets/icons.svg#language-icon" />
            </svg>
          </button>

          <ThemeToggle />

          <button onClick={onClose} type="button" className="language-select-button">
            <svg id="exit-icon" width={32} height={32}>
              <use href="./src/assets/icons.svg#exit-icon" />
            </svg>
          </button>
        </div>
      </div>
    </div>
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

  const handleThemeToggle = () => setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

  return (
    <button type="button" onClick={handleThemeToggle} className="theme-toggle-button">
      <svg id="theme-icon" width={32} height={32}>
        <use href="./src/assets/icons.svg#theme-icon" />
      </svg>
    </button>
  );
};
