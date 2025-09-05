import { TextContainer } from "../components/TextContainer";
import { TextConfig } from "../components/TextConfig";

export const TestPage = () => {
  return (
    <div className="test-page">
      <TextConfig />
      <TextContainer />
      <button className="restart-test-button">
        <span className="material-symbols-outlined">replay</span>
      </button>
    </div>
  );
};
