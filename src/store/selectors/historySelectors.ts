import type { RootState } from "../index";
import type { TestResultItem } from "../../types/types";
import { createSelector } from "@reduxjs/toolkit";

const selectHistory = (state: RootState) => state.results.history;
const selectFilters = (state: RootState) => state.filter;

const isDateMatch = (item: TestResultItem, dateFilter: string): boolean => {
  if (dateFilter === "all") return true;

  const testDate = new Date(item.stats.date);
  const now = new Date();

  switch (dateFilter) {
    case "last-hour":
      return now.getTime() - testDate.getTime() <= 60 * 60 * 1000;

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

export const selectFilteredAndSortedHistory = createSelector([selectHistory, selectFilters], (history, filters) => {
  let result = [...history];

  result = result.filter((item) => {
    if (filters.textTypeFilter !== "all" && item.stats.textType !== filters.textTypeFilter) return false;
    if (filters.modeFilter !== "all" && item.stats.mode !== filters.modeFilter) return false;
    if (filters.languageFilter !== "all" && item.stats.language !== filters.languageFilter) return false;
    if (!isDateMatch(item, filters.dateFilter)) return false;
    if (item.stats.duration < filters.durationMin || item.stats.duration > filters.durationMax) return false;
    return true;
  });

  result.sort((a, b) => {
    let comparison = 0;

    switch (filters.sortBy) {
      case "date":
        const dateA = new Date(a.stats.date).getTime();
        const dateB = new Date(b.stats.date).getTime();
        comparison = dateA - dateB;
        break;

      case "duration":
        comparison = a.stats.duration - b.stats.duration;
        break;

      case "wpm":
        comparison = a.stats.wpm - b.stats.wpm;
        break;

      case "accuracy":
        comparison = a.stats.accuracy - b.stats.accuracy;
        break;

      default:
        return 0;
    }

    return filters.sortOrder === "asc" ? comparison : -comparison;
  });

  const totalItems = result.length;
  const itemsPerPage = filters.itemsPerPage;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.min(filters.currentPage, totalPages > 0 ? totalPages : 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResult = result.slice(startIndex, endIndex);

  return paginatedResult;
});

export const selectPaginationData = createSelector([selectHistory, selectFilters], (history, filters) => {
  let result = [...history];

  result = result.filter((item) => {
    if (filters.textTypeFilter !== "all" && item.stats.textType !== filters.textTypeFilter) return false;

    if (filters.modeFilter !== "all" && item.stats.mode !== filters.modeFilter) return false;

    if (filters.languageFilter !== "all" && item.stats.language !== filters.languageFilter) return false;

    if (!isDateMatch(item, filters.dateFilter)) return false;

    if (item.stats.duration < filters.durationMin || item.stats.duration > filters.durationMax) return false;

    return true;
  });

  const totalItems = result.length;
  const itemsPerPage = filters.itemsPerPage;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.min(filters.currentPage, totalPages > 0 ? totalPages : 1);

  return { totalItems, totalPages, currentPage, itemsPerPage };
});
