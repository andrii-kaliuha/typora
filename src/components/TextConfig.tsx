import { useState } from "react";

export const TextConfig = () => {
  type MenuOptions = "text" | "language" | "duration" | "mode";
  type TextType = "random" | "custom";
  type Language = "ukrainian" | "english";
  type Mode = "normal" | "speed" | "accuracy";

  const [openMenu, setOpenMenu] = useState<MenuOptions>("text");
  const [textType, setTextType] = useState<TextType>("random");
  const [language, setLanguage] = useState<Language>("english");
  const [duration, setDuration] = useState<number>(90);
  const [mode, setMode] = useState<Mode>("normal");

  const handleTextTypeClick = (type: TextType) => {
    setTextType(type);
  };

  const handleLanguageClick = (lang: Language) => {
    setLanguage(lang);
  };

  const handleDurationClick = (time: number) => {
    setDuration(time);
  };

  const handleModeClick = (newMode: Mode) => {
    setMode(newMode);
  };

  const handleOptionClick = (option: MenuOptions) => {
    setOpenMenu(option);
  };

  return (
    <div className="text-config">
      <ul className="text-config-list">
        <li onClick={() => handleOptionClick("text")} className={`text-config-item ${openMenu === "text" ? "active" : ""}`}>
          Текст
        </li>
        <li onClick={() => handleOptionClick("language")} className={`text-config-item ${openMenu === "language" ? "active" : ""}`}>
          Мова
        </li>
        <li onClick={() => handleOptionClick("duration")} className={`text-config-item ${openMenu === "duration" ? "active" : ""}`}>
          Тривалість
        </li>
        <li onClick={() => handleOptionClick("mode")} className={`text-config-item ${openMenu === "mode" ? "active" : ""}`}>
          Режим
        </li>
      </ul>
      {openMenu === "text" && (
        <ul className="text-config-list">
          <li onClick={() => handleTextTypeClick("random")} className={`text-config-item ${textType === "random" ? "active" : ""}`}>
            Випадковий текст
          </li>
          <li onClick={() => handleTextTypeClick("custom")} className={`text-config-item ${textType === "custom" ? "active" : ""}`}>
            Власний текст
          </li>
        </ul>
      )}
      {openMenu === "language" && (
        <ul className="text-config-list">
          <li onClick={() => handleLanguageClick("ukrainian")} className={`text-config-item ${language === "ukrainian" ? "active" : ""}`}>
            Українська
          </li>
          <li onClick={() => handleLanguageClick("english")} className={`text-config-item ${language === "english" ? "active" : ""}`}>
            English
          </li>
        </ul>
      )}
      {openMenu === "duration" && (
        <ul className="text-config-list">
          <li onClick={() => handleDurationClick(30)} className={`text-config-item ${duration === 30 ? "active" : ""}`}>
            30
          </li>
          <li onClick={() => handleDurationClick(60)} className={`text-config-item ${duration === 60 ? "active" : ""}`}>
            60
          </li>
          <li onClick={() => handleDurationClick(90)} className={`text-config-item ${duration === 90 ? "active" : ""}`}>
            90
          </li>
          <li onClick={() => handleDurationClick(120)} className={`text-config-item ${duration === 120 ? "active" : ""}`}>
            120
          </li>
        </ul>
      )}
      {openMenu === "mode" && (
        <ul className="text-config-list">
          <li onClick={() => handleModeClick("normal")} className={`text-config-item ${mode === "normal" ? "active" : ""}`}>
            Звичайний
          </li>
          <li onClick={() => handleModeClick("speed")} className={`text-config-item ${mode === "speed" ? "active" : ""}`}>
            Швидкість
          </li>
          <li onClick={() => handleModeClick("accuracy")} className={`text-config-item ${mode === "accuracy" ? "active" : ""}`}>
            Точність
          </li>
        </ul>
      )}
    </div>
  );
};
