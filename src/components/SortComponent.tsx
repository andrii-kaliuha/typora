import { useSelector, useDispatch } from "react-redux";
import { setSortBy, setSortOrder } from "../store/filterSlice";
import type { SortBy } from "../store/filterSlice";
import type { RootState } from "../store";

export const SortComponent = () => {
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
    <div className="flex-group">
      <select onChange={handleFieldChange} value={currentSortBy} className="sort-select-field">
        <option value="date">Дата</option>
        <option value="duration">Тривалість</option>
        <option value="wpm">WPM</option>
        <option value="accuracy">Точність</option>
      </select>

      <button
        onClick={handleOrderToggle}
        className="sort-button-order"
        aria-label={`Сортувати за ${currentSortBy} у ${currentSortOrder === "asc" ? "спадаючому" : "зростаючому"} порядку`}
        title={`Напрямок: ${currentSortOrder === "asc" ? "Зростаючий" : "Спадаючий"}`}
      >
        <svg width={24} height={24}>
          <use href={`./src/assets/icons.svg#${currentSortOrder === "asc" ? "arrow-up-icon" : "arrow-down-icon"}`} />
        </svg>
      </button>
    </div>
  );
};
