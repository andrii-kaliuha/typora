import type { ReactNode } from "react";

type Option = { label: string; value: string };

export type CustomSelectProps = {
  options: Option[];
  currentOption: string;
  onChange: (value: string) => void;
};

export type CustomOptionProps = {
  style: string;
  option: Option;
  currentOption: string;
  onChange: (value: string) => void;
  setOpen: (isOpen: boolean) => void;
};

export type CustomSelectControlProps = {
  style: string;
  open: boolean;
  forElement: string;
  children: ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SortBy = "date" | "wpm" | "accuracy" | "duration";
export type SortOrder = "asc" | "desc";
export type DateFilter = "today" | "this-week" | "this-month" | "this-year";

export type MobileSortProps = { open: boolean; onClose: () => void };
