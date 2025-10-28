import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TextType = "random" | "custom";
export type Language = "ukrainian" | "english";
export type Mode = "normal" | "accuracy" | "strict";

type ConfigState = {
  textType: TextType;
  language: Language;
  duration: number;
  mode: Mode;
  currentText: string;
  customText: string;
  randomText: string;
};

const initialState: ConfigState = {
  textType: "random",
  language: "ukrainian",
  duration: 30,
  mode: "normal",
  currentText: "",
  customText: "",
  randomText: "",
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setTextType: (state, action: PayloadAction<TextType>) => {
      state.textType = action.payload;
      state.currentText = action.payload === "custom" ? state.customText : state.randomText;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
    },
    setCustomText: (state, action: PayloadAction<string>) => {
      state.customText = action.payload;
      if (state.textType === "custom") state.currentText = action.payload;
    },
    setRandomText: (state, action: PayloadAction<string>) => {
      state.randomText = action.payload;
      if (state.textType === "random") state.currentText = action.payload;
    },
  },
});

export const { setTextType, setLanguage, setDuration, setMode, setCustomText, setRandomText } = configSlice.actions;

export default configSlice.reducer;
