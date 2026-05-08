import type { TestResultItem } from "../types/types";

export const isDateMatch = (item: TestResultItem, dateFilter: string): boolean => {
  if (dateFilter === "all") return true;

  const testDate = new Date(item.stats.date);
  const now = new Date();

  switch (dateFilter) {
    case "today":
      return testDate.toDateString() === now.toDateString();

    case "this-week":
      return now.getTime() - testDate.getTime() <= 7 * 24 * 60 * 60 * 1000;

    case "this-month":
      return testDate.getMonth() === now.getMonth() && testDate.getFullYear() === now.getFullYear();

    case "this-year":
      return testDate.getFullYear() === now.getFullYear();

    default:
      return true;
  }
};
