import type { RootState } from "../index";
import { createSelector } from "@reduxjs/toolkit";
import { isDateMatch } from "../../shared/utils/isDateMatch";

const selectHistory = (state: RootState) => state.results.history;
const selectFilters = (state: RootState) => state.filter;

const selectFilteredHistory = createSelector([selectHistory, selectFilters], (history, filters) => {
  return history.filter((item) => {
    if (filters.textTypeFilter !== "all" && item.stats.textType !== filters.textTypeFilter) return false;
    if (filters.modeFilter !== "all" && item.stats.mode !== filters.modeFilter) return false;
    if (filters.languageFilter !== "all" && item.stats.language !== filters.languageFilter) return false;
    if (!isDateMatch(item, filters.dateFilter)) return false;
    if (item.stats.duration < filters.durationMin || item.stats.duration > filters.durationMax) return false;
    return true;
  });
});

const selectSortedHistory = createSelector([selectFilteredHistory, selectFilters], (filteredHistory, filters) => {
  let result = [...filteredHistory];

  result.sort((a, b) => {
    let comparison = 0;
    switch (filters.sortBy) {
      case "date":
        comparison = new Date(a.stats.date).getTime() - new Date(b.stats.date).getTime();
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

  return result;
});

export const selectPaginatedHistory = createSelector([selectSortedHistory, selectFilters], (sortedHistory, filters) => {
  const totalItems = sortedHistory.length;
  const itemsPerPage = filters.itemsPerPage;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.min(filters.currentPage, totalPages > 0 ? totalPages : 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return sortedHistory.slice(startIndex, endIndex);
});

export const selectPaginationData = createSelector([selectFilteredHistory, selectFilters], (filteredHistory, filters) => {
  const totalItems = filteredHistory.length;
  const itemsPerPage = filters.itemsPerPage;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.min(filters.currentPage, totalPages > 0 ? totalPages : 1);

  return { totalItems, totalPages, currentPage, itemsPerPage };
});
