import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configSlice";
import resultsReducer from "./resultsSlice";
import testReducer from "./testSlice";

export const store = configureStore({
  reducer: {
    config: configReducer,
    results: resultsReducer,
    test: testReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
