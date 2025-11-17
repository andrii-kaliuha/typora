import { useTranslation } from "react-i18next";
import { formatDate } from "./formatDate";

export const formatStat = ({ label, value }: { label: string; value: any }) => {
  const { t, i18n } = useTranslation();

  switch (label) {
    case "result.date":
      return formatDate(value, i18n.language);

    case "result.wpm":
    case "result.accuracy":
    case "result.duration":
      const roundedValue = Math.round(value);

      if (label === "result.accuracy") return `${roundedValue}%`;
      return roundedValue;

    default:
      if (typeof value === "string" && value.startsWith("result.")) return t(value);
      return value;
  }
};
