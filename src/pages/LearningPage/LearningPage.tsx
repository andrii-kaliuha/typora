import { useTranslation } from "react-i18next";
import postureForPrint from "../../assets/posture-for-print.svg";
import keyboardEn from "../../assets/keyboard-english.svg";
import keyboardUk from "../../assets/keyboard-ukrainian.svg";
import "./LearningPage.css";

export const LearningPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="learning-page">
      <h1 className="learning-title">{t("learning.title")}</h1>
      <p className="learning-subtitle">{t("learning.subtitle")}</p>

      <section className="advice-block">
        <LearningImage width={515} height={300} icon={postureForPrint} style="posture-for-print" />
        <h2 className="learning-title">{t("learning.posture-for-print.title")}</h2>
        <List
          items={[
            t("learning.posture-for-print.first-advice"),
            t("learning.posture-for-print.second-advice"),
            t("learning.posture-for-print.third-advice"),
            t("learning.posture-for-print.fourth-advice"),
            t("learning.posture-for-print.fifth-advice"),
            t("learning.posture-for-print.sixth-advice"),
            t("learning.posture-for-print.seventh-advice"),
            t("learning.posture-for-print.eighth-advice"),
          ]}
        />
      </section>

      <FingerPosition language={i18n.language} />

      <section className="advice-block">
        <h2 className="learning-title">{t("learning.print-speed.title")}</h2>
        <List
          items={[t("learning.print-speed.first-advice"), t("learning.print-speed.second-advice"), t("learning.print-speed.third-advice")]}
        />
      </section>

      <section className="advice-block">
        <h2 className="learning-title">{t("learning.finger-movement.title")}</h2>
        <List
          items={[
            t("learning.finger-movement.first-advice"),
            t("learning.finger-movement.second-advice"),
            t("learning.finger-movement.third-advice"),
          ]}
        />
      </section>
    </div>
  );
};

const FingerPosition = ({ language }: { language: string }) => {
  const { t } = useTranslation();
  const keyboard = language === "uk" ? keyboardUk : keyboardEn;

  return (
    <section className="advice-block">
      <h2 className="learning-title">{t("learning.finger-position.title")}</h2>
      <p>{t("learning.finger-position.first-advice")}</p>
      <p>{t("learning.finger-position.second-advice")}</p>

      <LearningImage width={712} height={244} icon={keyboard} style="keyboard" />

      <p>{t("learning.finger-position.third-advice")}</p>
      <List
        items={[
          t("learning.list.item-1"),
          t("learning.list.item-2"),
          t("learning.list.item-3"),
          t("learning.list.item-4"),
          t("learning.list.item-5"),
          t("learning.list.item-6"),
        ]}
      />
      <p>{t("learning.finger-position.fourth-advice")}</p>
    </section>
  );
};

const List = ({ items }: { items: string[] }) => {
  return (
    <ul className="advice-list">
      {items.map((item, index) => (
        <li key={index}>
          {index + 1} — {item}
        </li>
      ))}
    </ul>
  );
};

const LearningImage = ({ width, height, icon, style }: { width: number; height: number; style?: string; icon: string }) => {
  const viewBoxValue = `0 0 ${width} ${height}`;
  return (
    <div className={`image-container ${style}`}>
      <svg viewBox={viewBoxValue}>
        <use href={icon} />
      </svg>
    </div>
  );
};
