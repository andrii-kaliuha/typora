import { useTranslation } from "react-i18next";
import { formatDate } from "./formatDate";
import type { Language } from "../store/configSlice";

const TEXT_POOL_UA = [
  "Вона повільно йшла по вулиці, освітленій лише ліхтарями. Повітря було наповнене ароматом дощу і свіжої землі. У її руках була стара, потерта книга, яку вона читала вже втретє. Кожна сторінка повертала її в інший світ, де проблеми здавалися дрібними, а час — нескінченним. Вона зупинилась біля вітрини антикварного магазину, де у світлі місяця блищала срібна брошка. У цей момент вона відчула легкий дотик до своєї руки. Повернувшись, вона побачила старого, який посміхався, ніби вони знали одне одного все життя. Він нічого не сказав, просто передав їй маленьку квітку і зник у темряві.",

  "Швидкість друку є важливою навичкою у сучасному світі, де більшість комунікацій та роботи відбувається через клавіатуру. Вміння швидко та безпомилково набирати текст значно підвищує продуктивність, дозволяючи зосередитися на змісті, а не на механіці процесу. Регулярна практика допомагає розвинути м’язову пам’ять, що з часом робить друк майже автоматичним. Інструменти, що вимірюють кількість слів за хвилину, є чудовим способом відстежувати прогрес і ставити нові цілі. Це не просто змагання, а інвестиція у власний професійний розвиток.",

  "Над містом сходив сонячний промінь, пробиваючись крізь туман, що ще тримався над дахами будинків. Птахи прокидалися й наповнювали повітря мелодійним щебетом. Люди поспішали на роботу, не помічаючи, як світ навколо оживає. Лише один хлопчик стояв біля вікна і спостерігав за кожною дрібницею — за тим, як світло грає на склі, як вітер колише гілки. Він мріяв, що колись також зможе створювати щось настільки прекрасне, що інші зупиняться, аби подивитися.",

  "Коли осінь приходить у гори, ліси перетворюються на море кольорів — від яскраво-жовтого до глибокого бордового. Дороги вкриваються килимом із листя, яке шарудить під ногами. Вітер приносить запах хвої, диму та перших холодів. Десь далеко чути, як тріщить вогнище біля старої хатини. Там двоє мандрівників гріються, розповідаючи історії про далекі краї. Їхні голоси губляться серед тиші, але у цій тиші є щось живе, щось, що нагадує про вічність природи.",

  "У маленькому приморському містечку життя текло спокійно. Щоранку рибалки виходили в море, а діти збирали мушлі на березі. Старі будинки з блакитними віконницями виглядали, ніби з картини. Але одного дня все змінилося — море стало неспокійним, вітер здійнявся, і хвилі з гуркотом билися об берег. Люди дивилися на це з тривогою, та все ж у їхніх очах була повага — адже вони знали, що перед морем усі рівні.",
];

const TEXT_POOL_EN = [
  "She walked slowly down the street lit only by lanterns. The air was filled with the scent of rain and fresh earth. In her hands, she held an old, worn-out book she had already read three times. Each page took her to another world, where worries seemed small and time felt endless. She stopped by an antique shop window, where a silver brooch sparkled under the moonlight. At that moment, she felt a gentle touch on her hand. Turning around, she saw an old man smiling, as if they had known each other all their lives. He said nothing, just handed her a small flower and disappeared into the darkness.",

  "Typing speed is an essential skill in the modern world, where most communication and work happen through a keyboard. The ability to type quickly and accurately boosts productivity, allowing you to focus on the content rather than the mechanics of typing. Regular practice helps develop muscle memory, making typing feel almost automatic over time. Tools that measure words per minute are a great way to track progress and set new goals. It's not just a competition — it's an investment in personal growth.",

  "The morning sun rose over the city, breaking through the mist that still lingered above the rooftops. Birds awakened, filling the air with gentle melodies. People rushed to work, barely noticing how the world around them came alive. Only one boy stood by the window, watching everything — the light dancing on the glass, the wind moving the branches. He dreamed that one day, he too would create something so beautiful that others would stop just to see it.",

  "When autumn comes to the mountains, the forests turn into a sea of colors — from bright yellow to deep red. The roads are covered with a carpet of leaves that crunch underfoot. The wind carries the scent of pine, smoke, and the first chills. Somewhere far away, a campfire crackles near an old cabin. Two travelers sit there, sharing stories of distant lands. Their voices fade into the silence, but within that silence lies something alive — a reminder of nature’s eternity.",
];

const texts = { ukrainian: TEXT_POOL_UA, english: TEXT_POOL_EN };

export const getRandomText = (language: Language = "ukrainian"): string => {
  const availableTexts = texts[language];
  if (!availableTexts || availableTexts.length === 0) return "";

  const randomIndex = Math.floor(Math.random() * availableTexts.length);
  return availableTexts[randomIndex];
};

export const getNewText = (currentText: string, language: Language = "ukrainian"): string => {
  const availableTexts = texts[language];
  if (!availableTexts || availableTexts.length === 0) return "";

  const currentIndex = availableTexts.indexOf(currentText);

  if (currentIndex === -1) return getRandomText(language);

  const nextIndex = (currentIndex + 1) % availableTexts.length;

  return availableTexts[nextIndex];
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
