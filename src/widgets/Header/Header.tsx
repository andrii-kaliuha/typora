import "./Header.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigation } from "./Navigation";
import { Modal } from "../../shared/Modal/Modal";
import { Icon } from "../../shared/Icon";
import icons from "../../assets/icons.svg";

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
      <svg id="logotype-icon" aria-hidden="true">
        <use href={`${icons}#logotype-icon`} />
      </svg>
      <p className="logotype-text">Typora</p>
    </div>
  );
};

const LanguageSelect = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const language = i18n.language === "en" ? "uk" : "en";
    i18n.changeLanguage(language);
  };

  return <SettingButton icon="language-icon" action={toggleLanguage} ariaLabel={t("header.toggle-language")} />;
};

const ThemeToggle = () => {
  const { t } = useTranslation();
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

  return <SettingButton icon="theme-icon" action={handleThemeToggle} ariaLabel={t("header.toggle-theme")} />;
};

const MobileMenu = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <Menu isOpen={isMenuOpen} onClose={handleToggleMenu} />
      <SettingButton icon="menu-icon" action={handleToggleMenu} style="toggle-menu-button" ariaLabel={t("header.open-menu")} />
    </>
  );
};

const Menu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="menu-container">
        <Logotype />
        <Navigation action={onClose} />
        <div className="buttons-container">
          <LanguageSelect />
          <ThemeToggle />
          <SettingButton icon="exit-icon" action={onClose} ariaLabel={t("header.close-menu")} />
        </div>
      </div>
    </Modal>
  );
};

const SettingButton = ({ action, style, icon, ariaLabel }: { action: () => void; style?: string; icon: string; ariaLabel: string }) => {
  return (
    <button type="button" onClick={action} className={`setting-button ${style ?? ""}`} aria-label={ariaLabel}>
      <Icon width={32} height={32} icon={icon} />
    </button>
  );
};
