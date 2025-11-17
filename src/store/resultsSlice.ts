import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadHistory, saveHistory } from "../utils/storage/historyStorage";
import type { TestResultItem } from "../types/types";

type ResultsState = { history: TestResultItem[] };

const initialState: ResultsState = { history: loadHistory() };

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<TestResultItem>) => {
      state.history.unshift(action.payload);
      saveHistory(state.history);
    },
    removeFromHistory: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter((result) => result.id !== action.payload);
      saveHistory(state.history);
    },
    clearHistory: (state) => {
      state.history = [];
      localStorage.removeItem("typing_history");
    },
  },
});

export const { addToHistory, removeFromHistory, clearHistory } = resultsSlice.actions;
export default resultsSlice.reducer;
