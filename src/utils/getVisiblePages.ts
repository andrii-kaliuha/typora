export const getVisibleLimit = (width: number): number => {
  if (width < 768) return 3;
  if (width < 1024) return 5;
  return 7;
};

export const getVisiblePages = (totalPages: number, currentPage: number, maxVisibleButtons: number): number[] => {
  const buttonsToShow = maxVisibleButtons - 1;
  const half = Math.floor(buttonsToShow / 2);

  let start = currentPage - half;
  let end = currentPage + (buttonsToShow - half);

  if (start < 1) {
    end += 1 - start;
    start = 1;
  }

  if (end > totalPages) {
    start -= end - totalPages;
    end = totalPages;
  }

  start = Math.max(1, start);

  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return pages;
};
