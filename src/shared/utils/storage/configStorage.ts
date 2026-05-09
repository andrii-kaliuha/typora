import type { TextType, Language, Mode } from "../../types/types";

type SavedConfig = {
  textType: TextType;
  language: Language;
  duration: number;
  mode: Mode;
};

export const loadConfig = (): Partial<SavedConfig> => {
  try {
    const data = localStorage.getItem("typing_config");
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const saveConfig = (config: SavedConfig) => localStorage.setItem("typing_config", JSON.stringify(config));
