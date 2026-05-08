import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setTextType, setLanguage, setDuration, setMode } from "../../store/configSlice";
import { ConfigItem, UserTextButton } from "./ConfigItem";
import type { MenuOptions, TextType, Language, Mode } from "../../shared/types/types";
import type { RootState } from "../../store/index";
import "./TestConfig.css";

export const TestConfig = ({ visibility }: { visibility: boolean }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { textType, language, duration, mode } = useSelector((state: RootState) => state.config);
  const [openMenu, setOpenMenu] = useState<MenuOptions>("text");

  const handleOptionClick = (option: MenuOptions) => setOpenMenu(option);
  const handleTextTypeClick = (type: TextType) => dispatch(setTextType(type));
  const handleLanguageClick = (language: Language) => dispatch(setLanguage(language));
  const handleDurationClick = (duration: number) => dispatch(setDuration(duration));
  const handleModeClick = (mode: Mode) => dispatch(setMode(mode));

  return (
    <div className={`test-config ${visibility === false ? "hidden" : ""}`}>
      <div className="test-config-list">
        <ConfigItem id="text" activeKey={openMenu} label={t("config.text")} onSelect={() => handleOptionClick("text")} />
        <ConfigItem id="language" activeKey={openMenu} label={t("config.language")} onSelect={() => handleOptionClick("language")} />
        <ConfigItem id="duration" activeKey={openMenu} label={t("config.duration")} onSelect={() => handleOptionClick("duration")} />
        <ConfigItem id="mode" activeKey={openMenu} label={t("config.mode")} onSelect={() => handleOptionClick("mode")} />
      </div>
      {openMenu === "text" && (
        <div className="test-config-list">
          <ConfigItem id="random" activeKey={textType} label={t("config.random-text")} onSelect={() => handleTextTypeClick("random")} />
          <UserTextButton label={t("config.custom-text")} activeKey={textType} />
        </div>
      )}
      {openMenu === "language" && (
        <div className="test-config-list">
          <ConfigItem id="uk" activeKey={language} label={t("config.uk")} onSelect={() => handleLanguageClick("uk" as Language)} />
          <ConfigItem id="en" activeKey={language} label={t("config.en")} onSelect={() => handleLanguageClick("en" as Language)} />
        </div>
      )}
      {openMenu === "duration" && (
        <div className="test-config-list">
          <ConfigItem id={30} activeKey={duration} label={"30"} onSelect={() => handleDurationClick(30)} />
          <ConfigItem id={60} activeKey={duration} label={"60"} onSelect={() => handleDurationClick(60)} />
          <ConfigItem id={90} activeKey={duration} label={"90"} onSelect={() => handleDurationClick(90)} />
          <ConfigItem id={120} activeKey={duration} label={"120"} onSelect={() => handleDurationClick(120)} />
        </div>
      )}
      {openMenu === "mode" && (
        <div className="test-config-list">
          <ConfigItem id="normal" activeKey={mode} label={t("config.normal")} onSelect={() => handleModeClick("normal" as Mode)} />
          <ConfigItem id="accuracy" activeKey={mode} label={t("config.accuracy")} onSelect={() => handleModeClick("accuracy" as Mode)} />
          <ConfigItem id="strict" activeKey={mode} label={t("config.strict")} onSelect={() => handleModeClick("strict" as Mode)} />
        </div>
      )}
    </div>
  );
};
