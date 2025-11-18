import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrentPage } from "../store/filterSlice";
import { selectPaginationData } from "../store/selectors/historySelectors";

export const Pagination = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { totalPages, currentPage } = useSelector(selectPaginationData);

  const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  return (
    <div className="pagination-controls">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="pagination-button">
        <svg width={24} height={24}>
          <use href={`./src/assets/icons.svg#arrow-back-icon`} />
        </svg>
        {t("history.pagination.prev")}
      </button>

      {pages.map((page) => (
        <button key={page} onClick={() => handlePageChange(page)} className={`pagination-button ${page === currentPage ? "active" : ""}`}>
          {page}
        </button>
      ))}

      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="pagination-button">
        <p>{t("history.pagination.next")}</p>
        <svg width={24} height={24}>
          <use href={`./src/assets/icons.svg#arrow-next-icon`} />
        </svg>
      </button>
    </div>
  );
};
