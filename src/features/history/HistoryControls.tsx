import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { clearHistory } from "../../store/resultsSlice";
import { Filter } from "../filter/Filter";
import { ConfirmModal } from "../../shared/ui/Modal/ConfirmModal";
import { Sort } from "../sort/Sort";
import { MobileSort } from "../sort/MobileSort";
import { HistoryControl } from "./HistoryControl";
import "./HistoryControls.css";
import type { RootState } from "../../store";

export const HistoryControls = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const handleClearHistory = () => setIsConfirmModalOpen(true);

  const handleConfirmClear = () => {
    dispatch(clearHistory());
    setIsConfirmModalOpen(false);
  };

  const [isMobileSortOpen, setisMobileSortOpen] = useState(false);
  const handleToggleMobileSort = () => setisMobileSortOpen(!isMobileSortOpen);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleToggleFilter = () => setIsFilterOpen((prev) => !prev);

  const history = useSelector((state: RootState) => state.results.history);

  if (history.length === 0) return null;

  return (
    <div className={`history-controls ${isFilterOpen ? "filter-open" : ""}`}>
      <div className="history-header">
        <div className="buttons-container">
          <HistoryControl action={handleToggleFilter} name={t("history.filter.title")} icon="filter-icon" />
          <Sort />
          <HistoryControl action={handleToggleMobileSort} name={t("history.sort.title")} icon="sort-icon" className="mobile-sort" />
        </div>
        <HistoryControl action={handleClearHistory} name={t("history.clear-all")} icon="delete-icon" className="delete-button" />
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        message={t("modal.confirm.message-delete-all")}
        onConfirm={handleConfirmClear}
        onClose={() => setIsConfirmModalOpen(false)}
      />
      <Filter isOpen={isFilterOpen} />
      <MobileSort open={isMobileSortOpen} onClose={handleToggleMobileSort} />
    </div>
  );
};
