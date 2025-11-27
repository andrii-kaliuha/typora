import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { clearHistory } from "../../store/resultsSlice";
import { Filter } from "../../components/Filter/Filter";
import { ConfirmModal } from "../../components/Shared/ConfirmModal";
import { Sort } from "../../components/Sort/Sort";
import { MobileSort } from "../../components/Sort/MobileSort";
import { HistoryControl } from "./HistoryControl";

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

  return (
    <div className={`history-controls ${isFilterOpen ? "filter-open" : ""}`}>
      <div className="history-header">
        <div className="buttons-container">
          <HistoryControl action={handleToggleFilter} name={t("history.filter.title")} icon="filter-icon" />
          <Sort />
          <HistoryControl action={handleToggleMobileSort} name="Сортувати" icon="sort-icon" />
        </div>
        <HistoryControl action={handleClearHistory} name={t("history.clear-all")} icon="delete-icon" />
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
