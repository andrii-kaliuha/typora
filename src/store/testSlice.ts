import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TestStatus, TestResultItem } from "../types/types";

type TestState = { status: TestStatus; finalResults: TestResultItem | null };

const initialState: TestState = { status: "idle", finalResults: null };

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    resetTest: (state) => {
      state.status = "idle";
      state.finalResults = null;
    },
    startTest: (state) => {
      state.status = "running";
    },
    completeTest: (state, action: PayloadAction<TestResultItem>) => {
      state.finalResults = action.payload;
      state.status = "finished";
    },
  },
});

export const { resetTest, startTest, completeTest } = testSlice.actions;

export default testSlice.reducer;
