import { useDispatch, useSelector } from "react-redux";
import { setDateFilter, setTextTypeFilter, setModeFilter, setLanguageFilter, setDurationMin, setDurationMax } from "../store/filterSlice";
import type { RootState } from "../store/index";
import type { TextType, Mode, Language } from "../types/types";
import "./Filter.css";
import { Title, FilterList } from "./FilterList";
import type { DateFilter } from "../store/filterSlice";
import { useTranslation } from "react-i18next";

const FilterByDuration = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { durationMin, durationMax } = useSelector((state: RootState) => state.filter);
  const DURATION_OPTIONS = [0, 30, 60, 90, 120, 150];

  return (
    <div>
      <Title text={t("history.filter.duration.title")} />

      <ul className="filter-list">
        <li className="filter-item duration">
          <p>{t("history.filter.duration.less-than")}</p>
          <select id="duration-max" value={durationMax} onChange={(e) => dispatch(setDurationMax(Number(e.target.value)))}>
            {DURATION_OPTIONS.filter((opt) => opt > durationMin).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </li>

        <li className="filter-item duration">
          <p>{t("history.filter.duration.more-than")}</p>
          <select id="duration-min" value={durationMin} onChange={(e) => dispatch(setDurationMin(Number(e.target.value)))}>
            {DURATION_OPTIONS.filter((opt) => opt < durationMax).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </li>
      </ul>
    </div>
  );
};

type DateListType = { value: DateFilter | string; label: string }[];
type TextTypeList = { value: TextType | string; label: string }[];
type LanguageListType = { value: Language | string; label: string }[];
type ModeListType = { value: Mode | string; label: string }[];

const dateList: DateListType = [
  { value: "all", label: "history.filter.date.all" },
  // { value: "last-hour", label: "history.filter.date.last-hour" },
  { value: "today", label: "history.filter.date.today" },
  { value: "this-week", label: "history.filter.date.this-week" },
  { value: "this-month", label: "history.filter.date.this-month" },
  { value: "this-year", label: "history.filter.date.this-year" },
];

const textTypeList: TextTypeList = [
  { value: "all", label: "history.filter.date.all" },
  { value: "random", label: "history.filter.text-type.random" },
  { value: "custom", label: "history.filter.text-type.custom" },
];

const languageList: LanguageListType = [
  { value: "all", label: "history.filter.language.all" },
  { value: "english", label: "history.filter.language.english" },
  { value: "ukrainian", label: "history.filter.language.ukrainian" },
];

const modeList: ModeListType = [
  { value: "all", label: "history.filter.mode.all" },
  { value: "normal", label: "history.filter.mode.normal" },
  { value: "accuracy", label: "history.filter.mode.accuracy" },
  { value: "strict", label: "history.filter.mode.strict" },
];

export const Filter = ({ isOpen }: { isOpen: boolean }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { dateFilter, textTypeFilter, languageFilter, modeFilter } = useSelector((state: RootState) => state.filter);

  const handleDateSelect = (value: DateFilter | "all") => dispatch(setDateFilter(value));
  const handleTextTypeSelect = (value: TextType | "all") => dispatch(setTextTypeFilter(value));
  const handleLanguageSelect = (value: Language | "all") => dispatch(setLanguageFilter(value));
  const handleModeSelect = (value: Mode | "all") => dispatch(setModeFilter(value));

  return (
    <div className={`filter-container ${isOpen ? "open" : ""}`}>
      <FilterList title={t("history.filter.date.title")} onSelect={handleDateSelect} currentFilter={dateFilter} filterList={dateList} />
      <FilterList
        title={t("history.filter.text-type.title")}
        onSelect={handleTextTypeSelect}
        currentFilter={textTypeFilter}
        filterList={textTypeList}
      />
      <FilterList
        title={t("history.filter.language.title")}
        onSelect={handleLanguageSelect}
        currentFilter={languageFilter}
        filterList={languageList}
      />
      <FilterList title={t("history.filter.mode.title")} onSelect={handleModeSelect} currentFilter={modeFilter} filterList={modeList} />

      <FilterByDuration />
    </div>
  );
};
