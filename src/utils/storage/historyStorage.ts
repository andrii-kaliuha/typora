import type { TestResultItem } from "../../types/types";

export const loadHistory = (): TestResultItem[] => {
  try {
    const data = localStorage.getItem("typing_history");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveHistory = (history: TestResultItem[]) => localStorage.setItem("typing_history", JSON.stringify(history));
