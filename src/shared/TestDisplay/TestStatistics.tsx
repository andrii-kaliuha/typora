import { useTranslation } from "react-i18next";
import { formatStat } from "../../utils/formatters/formatStat";
import type { TestStatisticsProps } from "../../types/types";

export const TestStatistics = ({ stats }: TestStatisticsProps) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="stats">
      {stats.map((stat, index) => (
        <dl key={index} aria-label={t(stat.label)}>
          <dt>{t(stat.label)}</dt>
          <dd>{formatStat(stat, t, i18n.language)}</dd>
        </dl>
      ))}
    </div>
  );
};
