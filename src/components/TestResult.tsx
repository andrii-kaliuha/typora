import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./TestResult.css";
import { useScreenshot } from "../hooks/useScreenshot";
import { formatDate } from "../utils/formatDate";

export const renderStatValue = ({ label, value }: { label: string; value: any }) => {
  const { t, i18n } = useTranslation();

  if (label === "result.date") return formatDate(value, i18n.language);
  else if (typeof value === "string" && value.startsWith("result.")) return t(value);
  else return value;
};

type TestResultProps = {
  text: { letters: { letter: string; status: string; typedAt: number | null }[]; status: string }[];
  stats: { label: string; value: string | number }[];
  showFullButtons: boolean;
};

export const TestResult = ({ text, stats, showFullButtons }: TestResultProps) => {
  const { t } = useTranslation();
  const [isPlaying, togglePlaying] = useState(false);
  const DivRef = useRef<HTMLDivElement>(null);

  const handleTogglePlay = () => togglePlaying((prevIsPlaying) => !prevIsPlaying);
  const handleCapture = () => captureAndDownload(DivRef.current);
  const handleRepeat = () => console.log("repeat test");
  const handleNext = () => console.log("next test");

  const { captureAndDownload } = useScreenshot("test-result");

  return (
    <div className="test-result" ref={DivRef}>
      <Text text={text} />
      <div className="stats">
        {stats.map((stat, index) => (
          <dl key={index}>
            <dt>{t(stat.label)}</dt>
            <dd>{renderStatValue(stat)}</dd>
          </dl>
        ))}
      </div>
      <div className="buttons-container">
        <Button click={handleTogglePlay} name={t("result.watch-replay")} icon={isPlaying === false ? "play-icon" : "pause-icon"} />
        <Button click={handleCapture} name={t("result.screenshot")} icon="screenshot-icon" />

        {showFullButtons && (
          <>
            <Button click={handleRepeat} name={t("result.repeat-test")} icon="repeat-icon" />
            <Button click={handleNext} name={t("result.next-test")} icon="next-icon" />
          </>
        )}
      </div>
    </div>
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

type ButtonProps = { click: () => void; name: string; icon: string };

export const Button = ({ click, name, icon }: ButtonProps) => {
  return (
    <button type="button" className="result-button" onClick={click}>
      <p>{name}</p>
      <svg width={24} height={24}>
        <use href={`./src/assets/icons.svg#${icon}`} />
      </svg>
    </button>
  );
};
