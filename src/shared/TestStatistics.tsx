import { useTranslation } from "react-i18next";
import { renderStatValue } from "../utils/formatters";
import type { StatItem } from "../types/types";

type TestStatisticsProps = { stats: StatItem[] };

export const TestStatistics = ({ stats }: TestStatisticsProps) => {
  const { t } = useTranslation();

  return (
    <div className="stats">
      {stats.map((stat, index) => (
        <dl key={index}>
          <dt>{t(stat.label)}</dt>
          <dd>{renderStatValue(stat)}</dd>
        </dl>
      ))}
    </div>
  );
};
