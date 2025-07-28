import "./Header.css";

export const Header = () => {
  return (
    <header>
      <div className="logotype-container">
        <svg id="logotype">
          <use href="/icons.svg#logotype" />
        </svg>
        <p className="logotype-text">Typora</p>
      </div>
      {/* <ul className="navigation-list">
        <li>Home</li>
        <li>Test</li>
        <li>Learning</li>
        <li>History</li>
      </ul> */}
      <button type="button" className="theme-toggle-button">
        <svg id="theme-icon">
          <use href="/icons.svg#theme-icon" />
        </svg>
      </button>
    </header>
  );
};
