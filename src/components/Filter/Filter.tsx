import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../store/index";
import { setDateFilter, setTextTypeFilter, setLanguageFilter, setModeFilter } from "../../store/filterSlice";
import type { DateFilter } from "../../store/filterSlice";
import type { DateListType, TextTypeList, LanguageListType, ModeListType } from "../../types/FilterTypes";
import type { TextType, Language, Mode } from "../../types/types";
import { FilterList } from "./FilterList";
import { FilterByDuration } from "./FilterByDuration";
import "./Filter.css";

const dateList: DateListType = [
  { value: "all", label: "history.filter.date.all" },
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
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
