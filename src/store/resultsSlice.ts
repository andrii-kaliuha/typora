import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type LetterData = { letter: string; status: string; typedAt: number | null };
type WordData = { letters: LetterData[]; status: string };
type StatItem = { label: string; value: string | number };

export type TestResultItem = { textData: WordData[]; stats: StatItem[]; id: string };
type ResultsState = { history: TestResultItem[] };

const loadHistory = (): TestResultItem[] => {
  try {
    const data = localStorage.getItem("typing_history");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveHistory = (history: TestResultItem[]) => {
  localStorage.setItem("typing_history", JSON.stringify(history));
};

const initialState: ResultsState = {
  history: loadHistory(),
};

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
