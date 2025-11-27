import { useSelector, useDispatch } from "react-redux";
import { setSortBy, setSortOrder } from "../../store/filterSlice";
import type { SortBy } from "../../store/filterSlice";
import type { RootState } from "../../store";
import { useTranslation } from "react-i18next";
import { CustomSelect } from "./CustomSelect";

export const Sort = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentSortBy = useSelector((state: RootState) => state.filter.sortBy);
  const currentSortOrder = useSelector((state: RootState) => state.filter.sortOrder);

  const handleSortChange = (value: string) => {
    const newSortBy = value as SortBy;
    dispatch(setSortBy(newSortBy));
  };

  const handleOrderToggle = () => dispatch(setSortOrder(currentSortOrder === "asc" ? "desc" : "asc"));

  const sortOptions = [
    { value: "date", label: t("history.sort.by.date") },
    { value: "duration", label: t("history.sort.by.duration") },
    { value: "wpm", label: t("history.sort.by.wpm") },
    { value: "accuracy", label: t("history.sort.by.accuracy") },
  ];

  return (
    <div className="sort-container">
      <CustomSelect options={sortOptions} currentOption={currentSortBy} onChange={handleSortChange} />
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
