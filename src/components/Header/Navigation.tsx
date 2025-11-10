import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

export const Navigation = ({ action }: { action?: () => void }) => {
  const { t } = useTranslation();

  return (
    <nav className="navigation-list">
      <NavLink className="navigation-item" to="/test" onClick={action}>
        {t("navigation.test")}
      </NavLink>
      <NavLink className="navigation-item" to="/learning" onClick={action}>
        {t("navigation.learning")}
      </NavLink>
      <NavLink className="navigation-item" to="/history" onClick={action}>
        {t("navigation.history")}
      </NavLink>
    </nav>
  );
};
