import type { TextType, Language, Mode } from "./types";

export type DateFilter = "today" | "this-week" | "this-month" | "this-year";
export type DateListType = { value: DateFilter | string; label: string }[];
export type TextTypeList = { value: TextType | string; label: string }[];
export type LanguageListType = { value: Language | string; label: string }[];
export type ModeListType = { value: Mode | string; label: string }[];

export type Option = { value: string; label: string };

export type FilterValue = string | TextType | Mode | Language | DateFilter;

export type DataItemType = {
  value: FilterValue;
  label: string;
};

export type FilterItemProps<T extends FilterValue> = {
  isActive: boolean;
  onSelect: (value: T) => void;
  value: T;
  label: string;
};

export type FilterListProps = {
  title: string;
  filterList: DataItemType[];
  onSelect: (value: any) => void;
  currentFilter: FilterValue;
};
