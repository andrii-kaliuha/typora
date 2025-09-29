import "../components/HistoryPage.css";
import { useTranslation } from "react-i18next";

export const HistoryPage = () => {
  const historyList = [
    {
      text: "Швидкість друку є важливою навичкою у сучасному світі, де більшість комунікацій та роботи відбувається через клавіатуру. Вміння швидко та безпомилково набирати текст значно підвищує продуктивність, дозволяючи зосередитися на змісті, а не на механіці процесу. Регулярна практика допомагає розвинути м’язову пам’ять, що з часом робить друк майже автоматичним. Інструменти, що вимірюють кількість слів за хвилину, є чудовим способом відстежувати прогрес і ставити нові цілі. Це не просто змагання, а інвестиція у власний професійний розвиток.",
      stats: [
        { label: "accuracy", value: "92%" },
        { label: "words", value: "43" },
        { label: "characters", value: "127/2/11" },
        { label: "text", value: "random_text" },
        { label: "language", value: "english" },
        { label: "duration", value: "15" },
        { label: "mode", value: "strict" },
      ],
    },
    {
      text: "Вона повільно йшла по вулиці, освітленій лише ліхтарями. Повітря було наповнене ароматом дощу і свіжої землі. У її руках була стара, потерта книга, яку вона читала вже втретє. Кожна сторінка повертала її в інший світ, де проблеми здавалися дрібними, а час — нескінченним. Вона зупинилась біля вітрини антикварного магазину, де у світлі місяця блищала срібна брошка. У цей момент вона відчула легкий дотик до своєї руки. Повернувшись, вона побачила старого, який посміхався, ніби вони знали одне одного все життя. Він нічого не сказав, просто передав їй маленьку квітку і зник у темряві.",
      stats: [
        { label: "accuracy", value: "88%" },
        { label: "words", value: "57" },
        { label: "characters", value: "144/3/15" },
        { label: "text", value: "custom_text" },
        { label: "language", value: "ukrainian" },
        { label: "duration", value: "30" },
        { label: "mode", value: "normal" },
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
  const { t } = useTranslation();

  return (
    <li className="history-item">
      <div className="text">{text}</div>
      <ul className="stats">
        <li className="button-play-container">
          <p>{t("watch_replay")}</p>
          <svg className="play-icon" width={16} height={20}>
            <use href="/icons.svg#play-icon" />
          </svg>
        </li>
        {stats.map((stat, index) => (
          <li key={index}>
            <p>{t(stat.label)}</p>
            <span>{t(stat.value)}</span>
          </li>
        ))}
      </ul>
    </li>
  );
};
