import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setTextType, setLanguage, setDuration, setMode } from "../store/configSlice";
import type { TextType, Language, Mode } from "../store/configSlice";
import type { RootState } from "../store/index";
import { Modal } from "./Modal";

type MenuOptions = "text" | "language" | "duration" | "mode";

export const TextConfig = ({ visibility }: { visibility: boolean }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { textType, language, duration, mode } = useSelector((state: RootState) => state.config);
  const [openMenu, setOpenMenu] = useState<MenuOptions>("text");

  const handleOptionClick = (option: MenuOptions) => setOpenMenu(option);
  const handleTextTypeClick = (type: TextType) => dispatch(setTextType(type));
  const handleLanguageClick = (lang: Language) => dispatch(setLanguage(lang));
  const handleDurationClick = (timeStr: number) => dispatch(setDuration(timeStr));
  const handleModeClick = (mode: Mode) => dispatch(setMode(mode));

  return (
    <div className={`text-config ${visibility === false ? "hidden" : ""}`}>
      <div className="text-config-list">
        <ConfigItem id="text" activeKey={openMenu} label={t("config.text")} onSelect={() => handleOptionClick("text")} />
        <ConfigItem id="language" activeKey={openMenu} label={t("config.language")} onSelect={() => handleOptionClick("language")} />
        <ConfigItem id="duration" activeKey={openMenu} label={t("config.duration")} onSelect={() => handleOptionClick("duration")} />
        <ConfigItem id="mode" activeKey={openMenu} label={t("config.mode")} onSelect={() => handleOptionClick("mode")} />
      </div>
      {openMenu === "text" && (
        <div className="text-config-list">
          <ConfigItem id="random" activeKey={textType} label={t("config.random-text")} onSelect={() => handleTextTypeClick("random")} />
          <CustomTextButton label={t("config.custom-text")} activeKey={textType} />
        </div>
      )}
      {openMenu === "language" && (
        <div className="text-config-list">
          <ConfigItem
            id="ukrainian"
            activeKey={language}
            label={t("config.ukrainian")}
            onSelect={() => handleLanguageClick("ukrainian" as Language)}
          />
          <ConfigItem
            id="english"
            activeKey={language}
            label={t("config.english")}
            onSelect={() => handleLanguageClick("english" as Language)}
          />
        </div>
      )}
      {openMenu === "duration" && (
        <div className="text-config-list">
          <ConfigItem id={30} activeKey={duration} label={"30"} onSelect={() => handleDurationClick(30)} />
          <ConfigItem id={60} activeKey={duration} label={"60"} onSelect={() => handleDurationClick(60)} />
          <ConfigItem id={90} activeKey={duration} label={"90"} onSelect={() => handleDurationClick(90)} />
          <ConfigItem id={120} activeKey={duration} label={"120"} onSelect={() => handleDurationClick(120)} />
        </div>
      )}
      {openMenu === "mode" && (
        <div className="text-config-list">
          <ConfigItem id="normal" activeKey={mode} label={t("config.normal")} onSelect={() => handleModeClick("normal" as Mode)} />
          <ConfigItem id="accuracy" activeKey={mode} label={t("config.accuracy")} onSelect={() => handleModeClick("accuracy" as Mode)} />
          <ConfigItem id="strict" activeKey={mode} label={t("config.strict")} onSelect={() => handleModeClick("strict" as Mode)} />
        </div>
      )}
    </div>
  );
};

type ConfigItemProps<T extends string | number> = { id: T; activeKey: T; label: string; onSelect: (id: T) => void };

const ConfigItem = <T extends string | number>({ id, activeKey, label, onSelect }: ConfigItemProps<T>) => {
  return (
    <button key={id} onClick={() => onSelect(id)} className={`text-config-item ${activeKey === id ? "active" : ""}`}>
      {label}
    </button>
  );
};

const CustomTextButton = ({ label, activeKey }: { label: string; activeKey: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={handleOpen} className={`text-config-item ${activeKey === "custom" ? "active" : ""}`}>
        {label}
      </button>

      <Modal isOpen={isModalOpen} onClose={handleClose} />
    </>
  );
};
