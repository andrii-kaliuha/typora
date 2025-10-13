import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../components/HistoryPage.css";

export const HistoryPage = () => {
  const { t } = useTranslation();

  const historyList = [
    {
      text: "Швидкість друку є важливою навичкою у сучасному світі, де більшість комунікацій та роботи відбувається через клавіатуру. Вміння швидко та безпомилково набирати текст значно підвищує продуктивність, дозволяючи зосередитися на змісті, а не на механіці процесу. Регулярна практика допомагає розвинути м’язову пам’ять, що з часом робить друк майже автоматичним. Інструменти, що вимірюють кількість слів за хвилину, є чудовим способом відстежувати прогрес і ставити нові цілі. Це не просто змагання, а інвестиція у власний професійний розвиток.",
      stats: [
        { label: t("history.accuracy"), value: "92%" },
        { label: t("history.words"), value: "43" },
        { label: t("history.characters"), value: "127/2/11" },
        { label: t("history.text"), value: t("history.random-text") },
        { label: t("history.language"), value: t("history.english") },
        { label: t("history.duration"), value: "15" },
        { label: t("history.mode"), value: t("history.strict") },
      ],
    },
    {
      text: "Вона повільно йшла по вулиці, освітленій лише ліхтарями. Повітря було наповнене ароматом дощу і свіжої землі. У її руках була стара, потерта книга, яку вона читала вже втретє. Кожна сторінка повертала її в інший світ, де проблеми здавалися дрібними, а час — нескінченним. Вона зупинилась біля вітрини антикварного магазину, де у світлі місяця блищала срібна брошка. У цей момент вона відчула легкий дотик до своєї руки. Повернувшись, вона побачила старого, який посміхався, ніби вони знали одне одного все життя. Він нічого не сказав, просто передав їй маленьку квітку і зник у темряві.",
      stats: [
        { label: t("history.accuracy"), value: "88%" },
        { label: t("history.words"), value: "57" },
        { label: t("history.characters"), value: "144/3/15" },
        { label: t("history.text"), value: t("history.custom-text") },
        { label: t("history.language"), value: t("history.ukrainian") },
        { label: t("history.duration"), value: "30" },
        { label: t("history.mode"), value: t("history.normal") },
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

type HistoryItemProps = { text: string; stats: { label: string; value: string }[] };

const HistoryItem = ({ text, stats }: HistoryItemProps) => {
  const { t } = useTranslation();
  const [isPlaying, togglePlaying] = useState(false);

  const handleTogglePlay = () => {
    togglePlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <li className="history-item">
      <div className="text">{text}</div>
      <div className="stats">
        <button type="button" className="watch-replay-container" onClick={handleTogglePlay}>
          <p>{t("history.watch_replay")}</p>
          <svg width={16} height={16}>
            <use href={`./src/assets/icons.svg#${isPlaying === false ? "play-icon" : "pause-icon"}`} />
          </svg>
        </button>
        {stats.map((stat, index) => (
          <dl key={index}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </dl>
        ))}
      </div>
    </li>
  );
};
