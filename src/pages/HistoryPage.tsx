import "../components/HistoryPage.css";

export const HistoryPage = () => {
  return (
    <div className="history-page">
      <TextContainer />
      <StatsContainer />
    </div>
  );
};

const TextContainer = () => {
  return (
    <div className="text">
      Швидкість друку є важливою навичкою у сучасному світі, де більшість комунікацій та роботи відбувається через клавіатуру. Вміння швидко та
      безпомилково набирати текст значно підвищує продуктивність, дозволяючи зосередитися на змісті, а не на механіці процесу. Регулярна
      практика допомагає розвинути м’язову пам’ять, що з часом робить друк майже автоматичним. Інструменти, що вимірюють кількість слів за
      хвилину, є чудовим способом відстежувати прогрес і ставити нові цілі. Це не просто змагання, а інвестиція у власний професійний розвиток.
    </div>
  );
};

const StatsContainer = () => {
  return (
    <ul className="stats">
      <li>
        <p>Words Per Minute</p>
        <span>43</span>
      </li>
      <li>
        <p>Accuracy</p>
        <span>92%</span>
      </li>
      <li>
        <p>Time</p>
        <span>18s</span>
      </li>
      <li>
        <p>Language</p>
        <span>English</span>
      </li>
      <li>
        <p>Mode</p>
        <span>Default</span>
      </li>
      <li>
        <p>Text</p>
        <span>Випадковий текст</span>
      </li>
    </ul>
  );
};

// const StatsContainer = () => {
//   return (
//     <ul className="stats">
//       <li>
//         <p>Words Per Minute | Слів за хвилину</p>
//         <span>43</span>
//       </li>
//       <li>
//         <p>Accuracy | Точність</p>
//         <span>92%</span>
//       </li>
//       <li>
//         <p>Time | Час</p>
//         <span>18s</span>
//       </li>
//       <li>
//         <p>Language | Мова</p>
//         <span>English</span>
//       </li>
//       <li>
//         <p>Mode | Режим</p>
//         <span>Default</span>
//       </li>
//       <li>
//         <p>Text | Текст</p>
//         <span>Випадковий текст</span>
//       </li>
//     </ul>
//   );
// };
