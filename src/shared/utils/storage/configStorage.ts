import type { TextType, Language, Mode } from "../../types/types";

type SavedConfig = {
  textType: TextType;
  language: Language;
  duration: number;
  mode: Mode;
};

export const loadConfigStorage = (): Partial<SavedConfig> => {
  try {
    const data = localStorage.getItem("typing_config");
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const saveConfigStorage = (config: SavedConfig) => {
  const { textType, language, duration, mode } = config;
  localStorage.setItem("typing_config", JSON.stringify({ textType, language, duration, mode }));
};
