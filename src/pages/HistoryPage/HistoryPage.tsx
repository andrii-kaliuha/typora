import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./HistoryPage.css";
import { historyList } from "../../utils/historyList";
import { useScreenshot } from "../../hooks/useScreenshot";
import { formatDate } from "../../utils/formatDate";

export const HistoryPage = () => {
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

type HistoryItemProps = {
  text: { letters: { letter: string; status: string; typedAt: number | null }[]; status: string }[];
  stats: { label: string; value: string | number }[];
};

const HistoryItem = ({ text, stats }: HistoryItemProps) => {
  const { t, i18n } = useTranslation();
  const [isPlaying, togglePlaying] = useState(false);
  const LiRef = useRef<HTMLLIElement>(null);

  const handleTogglePlay = () => togglePlaying((prevIsPlaying) => !prevIsPlaying);
  const handleCapture = () => captureAndDownload(LiRef.current);

  const { captureAndDownload, isLoading } = useScreenshot("history-result");

  return (
    <li className="history-item" ref={LiRef}>
      <Text text={text} />
      <div className="stats">
        {stats.map((stat, index) => (
          <dl key={index}>
            <dt>{t(stat.label)}</dt>
            <dd>
              {stat.label === "history.date"
                ? formatDate(stat.value, i18n.language)
                : typeof stat.value === "string" && stat.value.startsWith("history.")
                ? t(stat.value)
                : stat.value}
            </dd>
          </dl>
        ))}
      </div>
      <div className="history-buttons-container">
        <button type="button" className="watch-replay-container" onClick={handleTogglePlay}>
          <p>{t("history.watch_replay")}</p>
          <svg width={16} height={16}>
            <use href={`./src/assets/icons.svg#${isPlaying === false ? "play-icon" : "pause-icon"}`} />
          </svg>
        </button>

        <button type="button" className="screenshot-container" disabled={isLoading} onClick={handleCapture}>
          <p>{t("history.screenshot")}</p>
          <svg width={24} height={24}>
            <use href="./src/assets/icons.svg#screenshot-icon" />
          </svg>
        </button>
      </div>
    </li>
  );
};

type TextProps = { text: { letters: { letter: string; status: string; typedAt: number | null }[]; status: string }[] };

const Text = ({ text }: TextProps) => {
  return (
    <div className="text">
      {text.map((word, index) => (
        <span key={index}>
          {word.letters.map((item, index) => (
            <span key={index} className={item.status}>
              {item.letter}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
};
