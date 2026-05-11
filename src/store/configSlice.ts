import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TextType, Language, Mode } from "../shared/types/types";
import { loadConfigStorage, saveConfigStorage } from "../shared/utils/storage/configStorage";
import { getRandomText } from "../shared/utils/typing/getText";

type ConfigState = {
  textType: TextType;
  language: Language;
  duration: number;
  mode: Mode;
  currentText: string;
  customText: string;
  randomText: string;
};

const savedConfig = loadConfigStorage();
const initialTextType = savedConfig?.textType === "custom" ? "random" : (savedConfig?.textType ?? "random");
const initialLanguage = savedConfig?.language ?? "en";

const defaultConfig: ConfigState = {
  textType: initialTextType,
  language: initialLanguage,
  duration: 30,
  mode: "normal",
  currentText: getRandomText(initialLanguage),
  customText: "",
  randomText: getRandomText(initialLanguage),
};

const initialState: ConfigState = { ...defaultConfig, ...savedConfig, textType: initialTextType };

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setTextType: (state, action: PayloadAction<TextType>) => {
      state.textType = action.payload;
      state.currentText = action.payload === "custom" ? state.customText : state.randomText;
      saveConfigStorage(state);
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      state.randomText = getRandomText(action.payload);
      state.currentText = state.textType === "random" ? state.randomText : state.customText;
      saveConfigStorage(state);
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
      saveConfigStorage(state);
    },
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
      saveConfigStorage(state);
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
