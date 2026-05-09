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
        <List items={t("learning.posture-for-print.items", { returnObjects: true }) as string[]} />
      </section>

      <FingerPosition language={i18n.language} />

      <section className="advice-block">
        <h2 className="learning-title">{t("learning.print-speed.title")}</h2>
        <List items={t("learning.print-speed.items", { returnObjects: true }) as string[]} />
      </section>

      <section className="advice-block">
        <h2 className="learning-title">{t("learning.finger-movement.title")}</h2>
        <List items={t("learning.finger-movement.items", { returnObjects: true }) as string[]} />
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
      <List items={t("learning.finger-position.items", { returnObjects: true }) as string[]} />

      <p>{t("learning.finger-position.fourth-advice")}</p>
    </section>
  );
};

const List = ({ items }: { items: string[] }) => {
  return (
    <ol className="advice-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
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
