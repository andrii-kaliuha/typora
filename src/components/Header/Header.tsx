import "./Header.css";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <header>
      <div className="logotype-container">
        <svg id="logotype-icon">
          <use href="/icons.svg#logotype-icon" />
        </svg>
        <p className="logotype-text">Typora</p>
      </div>
      <Navigation></Navigation>
      <button type="button" className="theme-toggle-button">
        <svg id="theme-icon">
          <use href="/icons.svg#theme-icon" />
        </svg>
      </button>
    </header>
  );
};
