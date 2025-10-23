import { useTranslation } from "react-i18next";
import { formatDate } from "./formatDate";

const TEXT_POOL = [
  "Вона повільно йшла по вулиці, освітленій лише ліхтарями. Повітря було наповнене ароматом дощу і свіжої землі. У її руках була стара, потерта книга, яку вона читала вже втретє. Кожна сторінка повертала її в інший світ, де проблеми здавалися дрібними, а час — нескінченним. Вона зупинилась біля вітрини антикварного магазину, де у світлі місяця блищала срібна брошка. У цей момент вона відчула легкий дотик до своєї руки. Повернувшись, вона побачила старого, який посміхався, ніби вони знали одне одного все життя. Він нічого не сказав, просто передав їй маленьку квітку і зник у темряві.",
  "Швидкість друку є важливою навичкою у сучасному світі, де більшість комунікацій та роботи відбувається через клавіатуру. Вміння швидко та безпомилково набирати текст значно підвищує продуктивність, дозволяючи зосередитися на змісті, а не на механіці процесу. Регулярна практика допомагає розвинути м’язову пам’ять, що з часом робить друк майже автоматичним. Інструменти, що вимірюють кількість слів за хвилину, є чудовим способом відстежувати прогрес і ставити нові цілі. Це не просто змагання, а інвестиція у власний професійний розвиток.",
];

export const getRandomText = () => {
  const randomIndex = Math.floor(Math.random() * TEXT_POOL.length);
  return TEXT_POOL[randomIndex];
};

export const getNewText = (currentText: string) => {
  const currentIndex = TEXT_POOL.indexOf(currentText);

  if (currentIndex === -1) return getRandomText();

  const nextIndex = (currentIndex + 1) % TEXT_POOL.length;
  return TEXT_POOL[nextIndex];
};

export const getCharStatus = (char: string, index: number, typedText: string): string => {
  if (index === typedText.length) return "cursor";
  const typedChar = typedText[index];
  if (typedChar === undefined) return "untyped";
  return typedChar === char ? "correct" : "incorrect";
};

export const getWordStatus = (letters: { status: string }[]): string => {
  if (letters.some((letter) => letter.status === "incorrect")) return "incorrect";
  if (letters.some((letter) => letter.status === "cursor" || letter.status === "untyped")) return "untyped";
  return "correct";
};

export const renderStatValue = ({ label, value }: { label: string; value: any }) => {
  const { t, i18n } = useTranslation();

  if (label === "result.date") return formatDate(value, i18n.language);
  else if (typeof value === "string" && value.startsWith("result.")) return t(value);
  else return value;
};

export const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
};
