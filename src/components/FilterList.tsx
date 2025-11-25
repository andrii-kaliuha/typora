import type { TextType, Mode, Language } from "../types/types";
import type { DateFilter } from "../store/filterSlice";
import { useTranslation } from "react-i18next";

type FilterValue = string | TextType | Mode | Language | DateFilter;

type DataItemType = {
  value: FilterValue;
  label: string;
};

type FilterItemProps<T extends FilterValue> = {
  isActive: boolean;
  onSelect: (value: T) => void;
  value: T;
  label: string;
};

type FilterListProps = {
  title: string;
  filterList: DataItemType[];
  onSelect: (value: any) => void;
  currentFilter: FilterValue;
};

export const Title = ({ text }: { text: string }) => {
  return (
    <div className="title-container">
      <h4>{text}</h4>
      <div className="divider"></div>
    </div>
  );
};

// export const FilterItem = <T extends FilterValue>({ value, label, onSelect, isActive }: FilterItemProps<T>) => {
//   return (
//     <li className={`filter-item  ${isActive ? "active" : ""}`} onClick={() => onSelect(value)}>
//       {label}
//     </li>
//   );
// };

// Оновлений компонент FilterItem
export const FilterItem = <T extends FilterValue>({ value, label, onSelect, isActive }: FilterItemProps<T>) => {
  return (
    <button
      className={`filter-item ${isActive ? "active" : ""}`}
      onClick={() => onSelect(value)}
      // button вже має tabIndex=0, role="button" та обробку Enter/Space
      type="button" // Додатково вказуємо type="button", щоб уникнути відправки форм
      aria-pressed={isActive} // Додатковий ARIA-атрибут, що вказує на стан "натиснуто/активно"
    >
      {label}
    </button>
  );
};

export const FilterList = ({ title, filterList, onSelect, currentFilter }: FilterListProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <Title text={title} />

      <ul className="filter-list">
        {filterList.map((item) => (
          <FilterItem key={item.value} value={item.value} label={t(item.label)} onSelect={onSelect} isActive={currentFilter === item.value} />
        ))}
      </ul>
    </div>
  );
};
