import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TextType, Mode, Language } from "../shared/types/types";
import type { SortBy, SortOrder } from "../features/sort/types";
import type { DateFilter } from "../features/filter/types";

type FilterState = {
  dateFilter: DateFilter | "all";
  textTypeFilter: TextType | "all";
  modeFilter: Mode | "all";
  languageFilter: Language | "all";
  durationMin: number;
  durationMax: number;

  sortBy: SortBy;
  sortOrder: SortOrder;
  currentPage: number;
  itemsPerPage: number;
};

const initialState: FilterState = {
  dateFilter: "all",
  textTypeFilter: "all",
  modeFilter: "all",
  languageFilter: "all",
  durationMin: 0,
  durationMax: 120,

  sortBy: "date",
  sortOrder: "desc",
  currentPage: 1,
  itemsPerPage: 5,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    resetFilters: () => {
      return initialState;
    },
    setDateFilter: (state, action: PayloadAction<FilterState["dateFilter"]>) => {
      state.dateFilter = action.payload;
    },
    setTextTypeFilter: (state, action: PayloadAction<FilterState["textTypeFilter"]>) => {
      state.textTypeFilter = action.payload;
    },
    setModeFilter: (state, action: PayloadAction<FilterState["modeFilter"]>) => {
      state.modeFilter = action.payload;
    },
    setLanguageFilter: (state, action: PayloadAction<FilterState["languageFilter"]>) => {
      state.languageFilter = action.payload;
    },
    setDurationMin: (state, action: PayloadAction<number>) => {
      state.durationMin = action.payload;
    },
    setDurationMax: (state, action: PayloadAction<number>) => {
      state.durationMax = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = Math.max(1, action.payload);
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
  },
});

export const {
  resetFilters,
  setDateFilter,
  setTextTypeFilter,
  setModeFilter,
  setLanguageFilter,
  setDurationMin,
  setDurationMax,
  setSortBy,
  setSortOrder,
  setCurrentPage,
  setItemsPerPage,
} = filterSlice.actions;

export default filterSlice.reducer;

export type FilterRootState = ReturnType<typeof filterSlice.reducer>;
