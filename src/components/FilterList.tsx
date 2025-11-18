import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/index";
import type { TextType, Mode, Language } from "../types/types";

type FilterValue = string | TextType | Mode | Language;

type FilterListProps<T extends FilterValue> = {
  title: string;
  filterValues: readonly T[];
  actionCreator: (value: T) => { type: string; payload: T };
  selector: (state: RootState) => T;
  i18nBaseKey: string;
};

export const FilterList = <T extends FilterValue>({ title, filterValues, actionCreator, selector, i18nBaseKey }: FilterListProps<T>) => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(selector);

  return (
    <ul className="filter-list">
      <li>{title}</li>

      {filterValues.map((filterValue) => (
        <li
          key={String(filterValue)}
          className={currentFilter === filterValue ? "active-filter" : ""}
          onClick={() => dispatch(actionCreator(filterValue))}
        >
          {t(`${i18nBaseKey}.${filterValue}`)}
        </li>
      ))}
    </ul>
  );
};
