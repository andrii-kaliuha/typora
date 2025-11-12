import { useTranslation } from "react-i18next";
import { formatDate } from "./formatDate";

export const renderStatValue = ({ label, value }: { label: string; value: any }) => {
  const { t, i18n } = useTranslation();

  if (label === "result.date") return formatDate(value, i18n.language);
  else if ((label === "result.wpm" || label === "result.accuracy" || label === "result.duration") && typeof value === "number") {
    const roundedValue = Math.round(value);

    if (label === "result.accuracy") {
      return `${roundedValue}%`;
    }

    return roundedValue;
  } else if (typeof value === "string" && value.startsWith("result.")) return t(value);
  else return value;
};

export const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
};
