import type { TestResultItem } from "../../types/types";

export const loadHistoryStorage = (): TestResultItem[] => {
  try {
    const data = localStorage.getItem("typing_history");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveHistoryStorage = (history: TestResultItem[]) => localStorage.setItem("typing_history", JSON.stringify(history));

export const clearHistoryStorage = () => localStorage.removeItem("typing_history");
