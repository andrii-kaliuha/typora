import { useTranslation } from "react-i18next";
import { formatStat } from "../utils/formatters/formatStat";
import type { TestStatisticsProps } from "../types/types";

export const TestStatistics = ({ stats }: TestStatisticsProps) => {
  const { t } = useTranslation();

  return (
    <div className="stats">
      {stats.map((stat, index) => (
        <dl key={index}>
          <dt>{t(stat.label)}</dt>
          <dd>{formatStat(stat)}</dd>
        </dl>
      ))}
    </div>
  );
};
