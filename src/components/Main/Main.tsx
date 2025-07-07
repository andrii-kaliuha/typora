import { FAQ } from "../FAQ";
import { AnimateSVG } from "./AnimateSVG";
import "./Main.css";

export const Main = () => {
  return (
    <main>
      <section className="main-wrapper">
        <AnimateSVG />
        <h1 className="text">Друкуй швидше</h1>
        <p className="text">Навчися швидко друкувати з клавіатурним тренажером TYPORA.</p>
        <p className="text">Використовуй наші уроки сліпого друку.</p>
        <div className="buttons-wrapper">
          <button type="button" className="button">
            Розпочати навчання
          </button>
          <button type="button" className="button">
            Пройти тест
          </button>
        </div>
      </section>
      <FAQ />
    </main>
  );
};
