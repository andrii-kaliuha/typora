import { TextContainer } from "../components/TextContainer";
import { TextConfig } from "../components/TextConfig";

export const TestPage = () => {
  const text =
    "Швидкість друку є важливою навичкою у сучасному світі, де більшість комунікацій та роботи відбувається через клавіатуру. Вміння швидко та безпомилково набирати текст значно підвищує продуктивність, дозволяючи зосередитися на змісті, а не на механіці процесу. Регулярна практика допомагає розвинути м’язову пам’ять, що з часом робить друк майже автоматичним. Інструменти, що вимірюють кількість слів за хвилину, є чудовим способом відстежувати прогрес і ставити нові цілі. Це не просто змагання, а інвестиція у власний професійний розвиток.";

  return (
    <div className="test-page">
      <TextConfig />
      <TextContainer text={text} />
      <div className="buttons-container">
        <button className="restart-test-button">
          <svg className="replay-icon" width={21} height={24}>
            <use href="/icons.svg#replay-icon" />
          </svg>
        </button>
        <span className="timer">00:15</span>
      </div>
    </div>
  );
};
