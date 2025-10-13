import { useState } from "react";
import { useTranslation } from "react-i18next";

export const TextConfig = () => {
  type MenuOptions = "text" | "language" | "duration" | "mode";
  type TextType = "random" | "custom";
  type Language = "ukrainian" | "english";
  type Mode = "normal" | "accuracy" | "strict";

  const { t } = useTranslation();

  const [openMenu, setOpenMenu] = useState<MenuOptions>("text");
  const [textType, setTextType] = useState<TextType>("random");
  const [language, setLanguage] = useState<Language>("ukrainian");
  const [duration, setDuration] = useState<string>("30");
  const [mode, setMode] = useState<Mode>("normal");

  const handleTextTypeClick = (type: TextType) => {
    setTextType(type);
  };

  const handleLanguageClick = (lang: Language) => {
    setLanguage(lang);
  };

  const handleDurationClick = (time: string) => {
    setDuration(time);
  };

  const handleModeClick = (mode: Mode) => {
    setMode(mode);
  };

  const handleOptionClick = (option: MenuOptions) => {
    setOpenMenu(option);
  };

  return (
    <div className="text-config">
      <div className="text-config-list">
        <ConfigMenuItem id="text" activeKey={openMenu} label={t("config.text")} onSelect={() => handleOptionClick("text")} />
        <ConfigMenuItem id="language" activeKey={openMenu} label={t("config.language")} onSelect={() => handleOptionClick("language")} />
        <ConfigMenuItem id="duration" activeKey={openMenu} label={t("config.duration")} onSelect={() => handleOptionClick("duration")} />
        <ConfigMenuItem id="mode" activeKey={openMenu} label={t("config.mode")} onSelect={() => handleOptionClick("mode")} />
      </div>
      {openMenu === "text" && (
        <div className="text-config-list">
          <ConfigMenuItem id="random" activeKey={textType} label={t("config.random-text")} onSelect={() => handleTextTypeClick("random")} />
          <ConfigMenuItem id="custom" activeKey={textType} label={t("config.custom-text")} onSelect={() => handleTextTypeClick("custom")} />
        </div>
      )}
      {openMenu === "language" && (
        <div className="text-config-list">
          <ConfigMenuItem id="ukrainian" activeKey={language} label={t("config.ukrainian")} onSelect={() => handleLanguageClick("ukrainian")} />
          <ConfigMenuItem id="english" activeKey={language} label={t("config.english")} onSelect={() => handleLanguageClick("english")} />
        </div>
      )}
      {openMenu === "duration" && (
        <div className="text-config-list">
          <ConfigMenuItem id="30" activeKey={duration} label="30" onSelect={() => handleDurationClick("30")} />
          <ConfigMenuItem id="60" activeKey={duration} label="60" onSelect={() => handleDurationClick("60")} />
          <ConfigMenuItem id="90" activeKey={duration} label="90" onSelect={() => handleDurationClick("90")} />
          <ConfigMenuItem id="120" activeKey={duration} label="120" onSelect={() => handleDurationClick("120")} />
        </div>
      )}
      {openMenu === "mode" && (
        <div className="text-config-list">
          <ConfigMenuItem id="normal" activeKey={mode} label={t("config.normal")} onSelect={() => handleModeClick("normal")} />
          <ConfigMenuItem id="accuracy" activeKey={mode} label={t("config.accuracy")} onSelect={() => handleModeClick("accuracy")} />
          <ConfigMenuItem id="strict" activeKey={mode} label={t("config.strict")} onSelect={() => handleModeClick("strict")} />
        </div>
      )}
    </div>
  );
};

type ConfigMenuItemProps = { id: string; activeKey: string; label: string; onSelect: (id: string) => void };

const ConfigMenuItem = ({ id, activeKey, label, onSelect }: ConfigMenuItemProps) => {
  return (
    <button key={id} onClick={() => onSelect(id)} className={`text-config-item ${activeKey === id ? "active" : ""}`}>
      {label}
    </button>
  );
};
