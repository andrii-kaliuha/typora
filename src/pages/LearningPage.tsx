import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import "../components/LearningPage.css";

export const LearningPage = () => {
  const { t } = useTranslation();

  return (
    <div className="learning-page">
      <h1>{t("learning.title")}</h1>
      <p className="learning-subtitle">{t("learning.subtitle")}</p>

      <section className="advice-block">
        <div className="image-container">
          <svg width={390} height={300}>
            <use href="/posture-for-printing-text.svg" />
          </svg>
        </div>

        <h2>{t("learning.posture_for_print")}</h2>
        <List
          items={[
            t("learning.first_advice_for_posture_for_printing"),
            t("learning.second_advice_for_posture_for_printing"),
            t("learning.third_advice_for_posture_for_printing"),
            t("learning.fourth_advice_for_posture_for_printing"),
            t("learning.fifth_advice_for_posture_for_printing"),
            t("learning.sixth_advice_for_posture_for_printing"),
            t("learning.seventh_advice_for_posture_for_printing"),
            t("learning.eighth_advice_for_posture_for_printing"),
          ]}
        />
      </section>

      <FingerPosition />

      <section className="advice-block">
        <h2>{t("learning.print_speed")}</h2>
        <List
          items={[
            t("learning.first_advice_for_print_speed"),
            t("learning.second_advice_for_print_speed"),
            t("learning.third_advice_for_print_speed"),
          ]}
        />
      </section>

      <section className="advice-block">
        <h2>{t("learning.finger_movement")}</h2>
        <List
          items={[
            t("learning.first_advice_for_finger_movement"),
            t("learning.second_advice_for_finger_movement"),
            t("learning.third_advice_for_finger_movement"),
          ]}
        />
      </section>
    </div>
  );
};

const FingerPosition = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => setLanguage(lng);
    i18n.on("languageChanged", handleLanguageChanged);
    return () => i18n.off("languageChanged", handleLanguageChanged);
  }, [i18n]);

  return (
    <section className="advice-block">
      <h2>{t("learning.finger_position")}</h2>
      <p>{t("learning.first_advice_for_finger_position")}</p>
      <p>{t("learning.second_advice_for_finger_position")}</p>

      <div className="image-container">
        {language === "uk" ? (
          <svg width={712} height={250}>
            <use href="/ukrainian-keyboard.svg"></use>
          </svg>
        ) : (
          <svg width={712} height={250}>
            <use href="/english-keyboard.svg"></use>
          </svg>
        )}
      </div>

      <p>{t("learning.third_advice_for_finger_position")}</p>
      <List
        items={[
          t("learning.list_item_1"),
          t("learning.list_item_2"),
          t("learning.list_item_3"),
          t("learning.list_item_4"),
          t("learning.list_item_5"),
          t("learning.list_item_6"),
        ]}
      />
      <p>{t("learning.fourth_advice_for_finger_position")}</p>
    </section>
  );
};

const List = ({ items }: { items: string[] }) => {
  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={index}>
          <span>{index + 1}</span>—<p>{item}</p>
        </li>
      ))}
    </ul>
  );
};
