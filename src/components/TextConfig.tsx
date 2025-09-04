import { useState } from "react";

export const TextConfig = () => {
  const [openMenu, setOpenMenu] = useState("text"); // "text" або "language" або "duration"
  const [textType, setTextType] = useState("random"); // "random" або "custom"
  const [language, setLanguage] = useState("en"); // "uk" або "en"
  const [duration, setDuration] = useState(90); // 30, 60, 90, 120

  const handleTextTypeClick = (type: string) => {
    setTextType(type);
  };

  const handleLanguageClick = (lang: string) => {
    setLanguage(lang);
  };
  const handleDurationClick = (time: number) => {
    setDuration(time);
  };

  const handleOptionClick = (option: string) => {
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
          <li onClick={() => handleLanguageClick("uk")} className={`text-config-item ${language === "uk" ? "active" : ""}`}>
            Українська
          </li>
          <li onClick={() => handleLanguageClick("en")} className={`text-config-item ${language === "en" ? "active" : ""}`}>
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
    </div>
  );
};
