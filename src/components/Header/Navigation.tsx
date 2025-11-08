import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const Navigation = ({ onClose }: { onClose?: () => void }) => {
  const { t } = useTranslation();

  return (
    <nav className="navigation-list">
      <NavLink className="navigation-item" to="/test" onClick={onClose}>
        {t("navigation.test")}
      </NavLink>
      <NavLink className="navigation-item" to="/learning" onClick={onClose}>
        {t("navigation.learning")}
      </NavLink>
      <NavLink className="navigation-item" to="/history" onClick={onClose}>
        {t("navigation.history")}
      </NavLink>
    </nav>
  );
};
