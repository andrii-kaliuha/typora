import { useTranslation } from "react-i18next";
import { renderStatValue } from "../utils/utils";

export const TestStatistics = ({ stats }: { stats: { label: string; value: string | number | Date }[] }) => {
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
