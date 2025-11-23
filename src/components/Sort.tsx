import { useSelector, useDispatch } from "react-redux";
import { setSortBy, setSortOrder } from "../store/filterSlice";
import type { SortBy } from "../store/filterSlice";
import type { RootState } from "../store";
import { useTranslation } from "react-i18next";

export const Sort = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentSortBy = useSelector((state: RootState) => state.filter.sortBy);
  const currentSortOrder = useSelector((state: RootState) => state.filter.sortOrder);

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value as SortBy;
    dispatch(setSortBy(newSortBy));
  };

  const handleOrderToggle = () => {
    dispatch(setSortOrder(currentSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="sort-container">
      <select onChange={handleFieldChange} value={currentSortBy} className="sort-select-field" id="sort">
        <option value="date">{t("history.sort.by.date")}</option>
        <option value="duration">{t("history.sort.by.duration")}</option>
        <option value="wpm">{t("history.sort.by.speed")}</option>
        <option value="accuracy">{t("history.sort.by.accuracy")}</option>
      </select>

      <button
        onClick={handleOrderToggle}
        className="sort-button-order"
        aria-label={t("history.sort.order.aria", {
          field: t(`history.sort.by.${currentSortBy}`),
          order: t(`history.sort.order.${currentSortOrder}`),
        })}
        title={t("history.sort.order.title", { order: t(`history.sort.order.${currentSortOrder}`) })}
      >
        <svg width={24} height={24}>
          <use href={`./src/assets/icons.svg#${currentSortOrder === "asc" ? "arrow-up-icon" : "arrow-down-icon"}`} />
        </svg>
      </button>
    </div>
  );
};
