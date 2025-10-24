import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setDuration, setLanguage, setMode, setTextType, setCustomText, type Language, type TextType, type Mode } from "../store/configSlice";
import { type RootState } from "../store";
import { Modal } from "./Modal";

type MenuOptions = "text" | "language" | "duration" | "mode";

export const TextConfig = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { textType, language, duration, mode } = useSelector((state: RootState) => state.config);

  const [openMenu, setOpenMenu] = useState<MenuOptions>("text");

  const handleTextTypeClick = (type: TextType) => dispatch(setTextType(type));

  const handleLanguageClick = (lang: Language) => dispatch(setLanguage(lang));

  const handleDurationClick = (timeStr: string) => {
    const timeNum = parseInt(timeStr, 10);
    if (!isNaN(timeNum)) {
      dispatch(setDuration(timeNum));
    }
  };

  const handleDurationClick2 = (timeStr: number) => dispatch(setDuration(timeStr));

  const handleModeClick = (mode: Mode) => dispatch(setMode(mode));

  const handleOptionClick = (option: MenuOptions) => setOpenMenu(option);

  const handleCustomTextSubmit = (text: string) => dispatch(setCustomText(text));

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
          <ConfigMenuItem3
            id="custom"
            activeKey={textType}
            label={t("config.custom-text")}
            onSelect={() => handleTextTypeClick("custom")}
            onSubmit={handleCustomTextSubmit}
          />
        </div>
      )}
      {openMenu === "language" && (
        <div className="text-config-list">
          <ConfigMenuItem
            id="ukrainian"
            activeKey={language}
            label={t("config.ukrainian")}
            onSelect={() => handleLanguageClick("ukrainian" as Language)}
          />
          <ConfigMenuItem
            id="english"
            activeKey={language}
            label={t("config.english")}
            onSelect={() => handleLanguageClick("english" as Language)}
          />
        </div>
      )}
      {openMenu === "duration" && (
        <>
          <div className="text-config-list">
            {["30", "60", "90", "120"].map((time) => (
              <ConfigMenuItem key={time} id={time} activeKey={duration.toString()} label={time} onSelect={() => handleDurationClick(time)} />
            ))}
          </div>
          <div className="text-config-list">
            <ConfigMenuItem2 id={30} activeKey={duration} label={"30"} onSelect={() => handleDurationClick2(30)} />
            <ConfigMenuItem2 id={60} activeKey={duration} label={"60"} onSelect={() => handleDurationClick2(60)} />
            <ConfigMenuItem2 id={90} activeKey={duration} label={"90"} onSelect={() => handleDurationClick2(90)} />
            <ConfigMenuItem2 id={120} activeKey={duration} label={"120"} onSelect={() => handleDurationClick2(120)} />
          </div>
        </>
      )}
      {openMenu === "mode" && (
        <div className="text-config-list">
          <ConfigMenuItem id="normal" activeKey={mode} label={t("config.normal")} onSelect={() => handleModeClick("normal" as Mode)} />
          <ConfigMenuItem id="accuracy" activeKey={mode} label={t("config.accuracy")} onSelect={() => handleModeClick("accuracy" as Mode)} />
          <ConfigMenuItem id="strict" activeKey={mode} label={t("config.strict")} onSelect={() => handleModeClick("strict" as Mode)} />
        </div>
      )}
    </div>
  );
};

type ConfigMenuItemProps = { id: string; activeKey: string; label: string; onSelect: (id: string) => void };

type ConfigMenuItemProps2 = { id: number; activeKey: number; label: string; onSelect: (id: number) => void };

type ConfigMenuItemProps3 = { id: string; activeKey: string; label: string; onSelect: (id: string) => void; onSubmit: (text: string) => void };

const ConfigMenuItem = ({ id, activeKey, label, onSelect }: ConfigMenuItemProps) => {
  return (
    <button key={id} onClick={() => onSelect(id)} className={`text-config-item ${activeKey === id ? "active" : ""}`}>
      {label}
    </button>
  );
};

const ConfigMenuItem2 = ({ id, activeKey, label, onSelect }: ConfigMenuItemProps2) => {
  return (
    <button key={id} onClick={() => onSelect(id)} className={`text-config-item ${activeKey === id ? "active" : ""}`}>
      {label}
    </button>
  );
};

const ConfigMenuItem3 = ({ id, activeKey, label, onSelect, onSubmit }: ConfigMenuItemProps3) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return (
    <>
      <button
        key={id}
        onClick={() => {
          onSelect(id);
          openModal();
        }}
        className={`text-config-item ${activeKey === id ? "active" : ""}`}
      >
        {label}
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={onSubmit} />
    </>
  );
};
