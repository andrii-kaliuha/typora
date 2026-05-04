import { useTranslation } from "react-i18next";
import type { FilterItemProps, FilterListProps, FilterValue } from "../../types/FilterTypes";

export const Title = ({ text }: { text: string }) => {
  return (
    <div className="title-container">
      <h4>{text}</h4>
      <div className="divider"></div>
    </div>
  );
};

const FilterItem = <T extends FilterValue>({ value, label, onSelect, isActive }: FilterItemProps<T>) => {
  return (
    <button className={`filter-item ${isActive ? "active" : ""}`} onClick={() => onSelect(value)} type="button" aria-pressed={isActive}>
      {label}
    </button>
  );
};

export const FilterList = ({ title, filterList, onSelect, currentFilter }: FilterListProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <Title text={title} />

      <div className="filter-list">
        {filterList.map((item) => (
          <FilterItem key={item.value} value={item.value} label={t(item.label)} onSelect={onSelect} isActive={currentFilter === item.value} />
        ))}
      </div>
    </div>
  );
};
