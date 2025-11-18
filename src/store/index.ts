import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configSlice";
import testReducer from "./testSlice";
import resultsReducer from "./resultsSlice";
import filterReducer from "./filterSlice";

export const store = configureStore({
  reducer: {
    config: configReducer,
    test: testReducer,
    results: resultsReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
