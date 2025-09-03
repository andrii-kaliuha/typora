import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav>
      <ul className="navigation-list">
        <li>
          <NavLink className="navigation-item" to="/test">
            Test
          </NavLink>
        </li>
        <li>
          <NavLink className="navigation-item" to="/learning">
            Learning
          </NavLink>
        </li>
        <li>
          <NavLink className="navigation-item" to="/history">
            History
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
