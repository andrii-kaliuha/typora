import { useTranslation } from "react-i18next";
import { renderStatValue } from "../utils/formatters";
import type { Stats } from "../types/types";
import { formatStats } from "../utils/formatStatsForDisplay";

type TestStatisticsProps = { stats: Stats };

export const TestStatistics = ({ stats }: TestStatisticsProps) => {
  const { t } = useTranslation();

  const statsForDisplay = formatStats(stats);

  return (
    <div className="stats">
      {statsForDisplay.map((stat, index) => (
        <dl key={index}>
          <dt>{t(stat.label)}</dt>
          <dd>{renderStatValue(stat)}</dd>
        </dl>
      ))}
    </div>
  );
};
