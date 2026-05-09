import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TextType, Language, Mode } from "../shared/types/types";
import { loadConfig, saveConfig } from "../shared/utils/storage/configStorage";

type ConfigState = {
  textType: TextType;
  language: Language;
  duration: number;
  mode: Mode;
  currentText: string;
  customText: string;
  randomText: string;
};

const defaultConfig: ConfigState = {
  textType: "random",
  language: "uk",
  duration: 30,
  mode: "normal",
  currentText: "",
  customText: "",
  randomText: "",
};

const initialState: ConfigState = { ...defaultConfig, ...loadConfig() };

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setTextType: (state, action: PayloadAction<TextType>) => {
      state.textType = action.payload;
      state.currentText = action.payload === "custom" ? state.customText : state.randomText;
      saveConfig(state);
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      saveConfig(state);
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
      saveConfig(state);
    },
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
      saveConfig(state);
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
