import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateFilter,
  setTextTypeFilter,
  setModeFilter,
  setLanguageFilter,
  setDurationMin,
  setDurationMax,
  resetFilters,
} from "../store/filterSlice";
import type { RootState } from "../store/index";
import type { TextType, Mode, Language } from "../types/types";
import "./Filter.css";
import { FilterList } from "./FilterList";

const TEXT_TYPES: (TextType | "all")[] = ["all", "random", "custom"];
const MODES: (Mode | "all")[] = ["all", "normal", "accuracy", "strict"];
const LANGUAGES: (Language | "all")[] = ["all", "english", "ukrainian"];
const DATE_FILTERS = ["all", "last-hour", "today", "this-week", "this-month", "this-year"] as const;
const DURATION_OPTIONS = [0, 30, 60, 90, 120, 150];

export const Filter = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  const dispatch = useDispatch();
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleReset = () => dispatch(resetFilters());

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="filter-container">
        <h2 className="filter-title">Filters</h2>
        <div className="filter-content">
          <FilterList
            title={t(`history.filter.date.title`)}
            filterValues={DATE_FILTERS}
            actionCreator={setDateFilter}
            selector={(state: RootState) => state.filter.dateFilter}
            i18nBaseKey="history.filter.date"
          />

          <FilterList
            title={t(`history.filter.text-type.title`)}
            filterValues={TEXT_TYPES}
            actionCreator={setTextTypeFilter}
            selector={(state: RootState) => state.filter.textTypeFilter}
            i18nBaseKey="history.filter.text-type"
          />

          <FilterList
            title={t(`history.filter.mode.title`)}
            filterValues={MODES}
            actionCreator={setModeFilter}
            selector={(state: RootState) => state.filter.modeFilter}
            i18nBaseKey="history.filter.mode"
          />

          <FilterList
            title={t(`history.filter.language.title`)}
            filterValues={LANGUAGES}
            actionCreator={setLanguageFilter}
            selector={(state: RootState) => state.filter.languageFilter}
            i18nBaseKey="history.filter.language"
          />

          <FilterByDuration />
        </div>
        <div className="modal-footer">
          <button type="button" onClick={handleReset} className="filter-reset-button">
            {t("history.reset")}
          </button>

          <button type="submit" onClick={onClose} className="filter-confirm-button">
            {t("history.show-results")}
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterByDuration = () => {
  const dispatch = useDispatch();
  const { durationMin, durationMax } = useSelector((state: RootState) => state.filter);

  return (
    <ul className="filter-list duration">
      <li>{t("history.filter.duration.title")}</li>

      <li className="filter-duration">
        <p>{t("history.filter.duration.less-than")}</p>
        <select value={durationMax} onChange={(e) => dispatch(setDurationMax(Number(e.target.value)))}>
          {DURATION_OPTIONS.filter((opt) => opt > durationMin).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </li>

      <li className="filter-duration">
        <p>{t("history.filter.duration.more-than")}</p>
        <select value={durationMin} onChange={(e) => dispatch(setDurationMin(Number(e.target.value)))}>
          {DURATION_OPTIONS.filter((opt) => opt < durationMax).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </li>
    </ul>
  );
};
