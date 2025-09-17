import "../components/HistoryPage.css";

export const HistoryPage = () => {
  const historyList = [
    {
      text: "Швидкість друку є важливою навичкою у сучасному світі, де більшість комунікацій та роботи відбувається через клавіатуру. Вміння швидко та безпомилково набирати текст значно підвищує продуктивність, дозволяючи зосередитися на змісті, а не на механіці процесу. Регулярна практика допомагає розвинути м’язову пам’ять, що з часом робить друк майже автоматичним. Інструменти, що вимірюють кількість слів за хвилину, є чудовим способом відстежувати прогрес і ставити нові цілі. Це не просто змагання, а інвестиція у власний професійний розвиток.",
      stats: [
        { label: "Accuracy", value: "92%" },
        { label: "Words", value: "43" },
        { label: "Symbols", value: "127/2/11" },
        { label: "Text", value: "Random text" },
        { label: "Language", value: "English" },
        { label: "Time", value: "18 seconds" },
        { label: "Mode", value: "Default" },
      ],
    },
    {
      text: "Вона повільно йшла по вулиці, освітленій лише ліхтарями. Повітря було наповнене ароматом дощу і свіжої землі. У її руках була стара, потерта книга, яку вона читала вже втретє. Кожна сторінка повертала її в інший світ, де проблеми здавалися дрібними, а час — нескінченним. Вона зупинилась біля вітрини антикварного магазину, де у світлі місяця блищала срібна брошка. У цей момент вона відчула легкий дотик до своєї руки. Повернувшись, вона побачила старого, який посміхався, ніби вони знали одне одного все життя. Він нічого не сказав, просто передав їй маленьку квітку і зник у темряві.",
      stats: [
        { label: "Точність", value: "88%" },
        { label: "Слова", value: "57" },
        { label: "Символи", value: "144/3/15" },
        { label: "Текст", value: "Власний текст" },
        { label: "Мова", value: "Українська" },
        { label: "Час", value: "14 секунд" },
        { label: "Режим", value: "Звичайний" },
      ],
    },
  ];

  return (
    <div className="history-page">
      <ul className="history-list">
        {historyList.map((item, index) => (
          <HistoryItem key={index} text={item.text} stats={item.stats} />
        ))}
      </ul>
    </div>
  );
};

type HistoryProps = { text: string; stats: { label: string; value: string }[] };

const HistoryItem = ({ text, stats }: HistoryProps) => {
  return (
    <li className="history-item">
      <div className="text">{text}</div>
      <ul className="stats">
        {stats.map((stat, index) => (
          <li key={index}>
            <p>{stat.label}</p>
            <span>{stat.value}</span>
          </li>
        ))}
      </ul>
    </li>
  );
};

const createTextElement = (text: string) => {
  const words = text.split(" ").map((word) => {
    const letters = word.split("").map((char) => ({
      char,
      status: "untyped",
    }));

    return {
      word,
      status: "untyped",
      letters,
    };
  });

  console.log(words);
  return words;
};

const text =
  "Швидкість друку є важливою навичкою у сучасному світі, де більшість комунікацій та роботи відбувається через клавіатуру. Вміння швидко та безпомилково набирати текст значно підвищує продуктивність, дозволяючи зосередитися на змісті, а не на механіці процесу. Регулярна практика допомагає розвинути м’язову пам’ять, що з часом робить друк майже автоматичним. Інструменти, що вимірюють кількість слів за хвилину, є чудовим способом відстежувати прогрес і ставити нові цілі. Це не просто змагання, а інвестиція у власний професійний розвиток.";

createTextElement(text);
