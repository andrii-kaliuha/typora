import "./Header.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigation } from "./Navigation";
import { Modal } from "../Shared/Modal";

export const Header = () => (
  <header>
    <Logotype />
    <Navigation />
    <div className="buttons-container">
      <LanguageSelect />
      <ThemeToggle />
    </div>
    <MobileMenu />
  </header>
);

const Logotype = () => {
  return (
    <div className="logotype-container">
      <svg id="logotype-icon">
        <use href="./src/assets/icons.svg#logotype-icon" />
      </svg>
      <p className="logotype-text">Typora</p>
    </div>
  );
};

const LanguageSelect = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const language = i18n.language === "en" ? "uk" : "en";
    i18n.changeLanguage(language);
  };

  return <SettingButton icon="language-icon" action={toggleLanguage} />;
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

  return <SettingButton icon="theme-icon" action={handleThemeToggle} />;
};

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <Menu isOpen={isMenuOpen} onClose={handleToggleMenu} />
      <SettingButton icon="menu-icon" action={handleToggleMenu} style="toggle-menu-button" />
    </>
  );
};

const Menu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="menu-container">
        <Logotype />
        <Navigation action={onClose} />
        <div className="buttons-container">
          <LanguageSelect />
          <ThemeToggle />
          <SettingButton icon="exit-icon" action={onClose} />
        </div>
      </div>
    </Modal>
  );
};

const SettingButton = ({ action, style, icon }: { action: () => void; style?: string; icon: string }) => {
  return (
    <button type="button" onClick={action} className={`setting-button ${style}`}>
      <svg width={32} height={32}>
        <use href={`./src/assets/icons.svg#${icon}`} />
      </svg>
    </button>
  );
};
