import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav>
      <ul className="navigation-list">
        <li>
          <NavLink className="navigation-item" to="/test">
            Тест
          </NavLink>
        </li>
        <li>
          <NavLink className="navigation-item" to="/learning">
            Навчання
          </NavLink>
        </li>
        <li>
          <NavLink className="navigation-item" to="/history">
            Історія
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
