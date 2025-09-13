import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="navigation-list">
      <NavLink className="navigation-item" to="/test">
        Тест
      </NavLink>
      <NavLink className="navigation-item" to="/learning">
        Навчання
      </NavLink>
      <NavLink className="navigation-item" to="/history">
        Історія
      </NavLink>
    </nav>
  );
};
