import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadHistoryStorage, saveHistoryStorage, clearHistoryStorage } from "../shared/utils/storage/historyStorage";
import type { TestResultItem } from "../shared/types/types";

type ResultsState = { history: TestResultItem[] };

const initialState: ResultsState = { history: loadHistoryStorage() };

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<TestResultItem>) => {
      state.history.unshift(action.payload);
      saveHistoryStorage(state.history);
    },
    removeFromHistory: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter((result) => result.id !== action.payload);
      saveHistoryStorage(state.history);
    },
    clearHistory: (state) => {
      state.history = [];
      clearHistoryStorage();
    },
  },
});

export const { addToHistory, removeFromHistory, clearHistory } = resultsSlice.actions;
export default resultsSlice.reducer;
