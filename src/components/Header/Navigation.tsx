import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  const { t } = useTranslation();

  return (
    <nav className="navigation-list">
      <NavLink className="navigation-item" to="/test">
        {t("navigation.test")}
      </NavLink>
      <NavLink className="navigation-item" to="/learning">
        {t("navigation.learning")}
      </NavLink>
      <NavLink className="navigation-item" to="/history">
        {t("navigation.history")}
      </NavLink>
    </nav>
  );
};
