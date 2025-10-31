import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type LetterData = { letter: string; status: string; typedAt: number | null };
type WordData = { letters: LetterData[]; status: string };
type StatItem = { label: string; value: string | number };

export type TestResultItem = { textData: WordData[]; stats: StatItem[]; id: string };
type ResultsState = { history: TestResultItem[] };

const initialState: ResultsState = { history: [] };

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<TestResultItem>) => {
      state.history.unshift(action.payload);
    },
    removeFromHistory: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter((result) => result.id !== action.payload);
    },
  },
});

export const { addToHistory, removeFromHistory } = resultsSlice.actions;

export default resultsSlice.reducer;
