import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrentPage } from "../../store/filterSlice";
import { selectPaginationData } from "../../store/selectors/historySelectors";
import { getVisibleLimit, getVisiblePages } from "../../utils/getVisiblePages";

export const Pagination = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxVisibleButtons = getVisibleLimit(windowWidth);

  const { totalPages, currentPage } = useSelector(selectPaginationData);

  const visiblePages = useMemo(() => {
    return getVisiblePages(totalPages, currentPage, maxVisibleButtons);
  }, [totalPages, currentPage, maxVisibleButtons]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) dispatch(setCurrentPage(page));
    },
    [dispatch, totalPages]
  );

  return (
    <div className="pagination-controls">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="pagination-button">
        <svg width={24} height={24}>
          <use href={`./src/assets/icons.svg#arrow-back-icon`} />
        </svg>
        <p className="pagination-button-text">{t("history.pagination.prev")}</p>
      </button>

      {visiblePages.map((page) => (
        <button key={page} onClick={() => handlePageChange(page)} className={`pagination-button ${page === currentPage ? "active" : ""}`}>
          {page}
        </button>
      ))}

      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="pagination-button">
        <p className="pagination-button-text">{t("history.pagination.next")}</p>
        <svg width={24} height={24}>
          <use href={`./src/assets/icons.svg#arrow-next-icon`} />
        </svg>
      </button>
    </div>
  );
};
