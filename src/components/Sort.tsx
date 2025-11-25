// import { useSelector, useDispatch } from "react-redux";
// import { setSortBy, setSortOrder } from "../store/filterSlice";
// import type { SortBy } from "../store/filterSlice";
// import type { RootState } from "../store";
// import { useTranslation } from "react-i18next";
// import { CustomSelect, Sort as SortComponent } from "../components/CustomSelect";

// export const Sort = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const currentSortBy = useSelector((state: RootState) => state.filter.sortBy);
//   const currentSortOrder = useSelector((state: RootState) => state.filter.sortOrder);

//   const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newSortBy = e.target.value as SortBy;
//     dispatch(setSortBy(newSortBy));
//   };

//   const handleOrderToggle = () => {
//     dispatch(setSortOrder(currentSortOrder === "asc" ? "desc" : "asc"));
//   };

//   const sortOptions = [
//     { value: "date", label: "Дата" },
//     { value: "duration", label: "Тривалість" },
//     { value: "wpm", label: "Швидкість" },
//     { value: "accuracy", label: "Точність" },
//   ];

//   return (
//     <div className="sort-container">
//       <select onChange={handleFieldChange} value={currentSortBy} className="sort-select-field" id="sort">
//         <option value="date">{t("history.sort.by.date")}</option>
//         <option value="duration">{t("history.sort.by.duration")}</option>
//         <option value="wpm">{t("history.sort.by.speed")}</option>
//         <option value="accuracy">{t("history.sort.by.accuracy")}</option>
//       </select>

//       <CustomSelect options={sortOptions} currentOption={currentSortBy} onChange={handleFieldChange} />

//       <button
//         onClick={handleOrderToggle}
//         className="sort-button-order"
//         aria-label={t("history.sort.order.aria", {
//           field: t(`history.sort.by.${currentSortBy}`),
//           order: t(`history.sort.order.${currentSortOrder}`),
//         })}
//         title={t("history.sort.order.title", { order: t(`history.sort.order.${currentSortOrder}`) })}
//       >
//         <svg width={24} height={24}>
//           <use href={`./src/assets/icons.svg#${currentSortOrder === "asc" ? "arrow-up-icon" : "arrow-down-icon"}`} />
//         </svg>
//       </button>
//     </div>
//   );
// };

import { useSelector, useDispatch } from "react-redux";
import { setSortBy, setSortOrder } from "../store/filterSlice";
import type { SortBy } from "../store/filterSlice";
import type { RootState } from "../store";
import { useTranslation } from "react-i18next";
import { CustomSelect } from "../components/CustomSelect";

export const Sort = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentSortBy = useSelector((state: RootState) => state.filter.sortBy);
  const currentSortOrder = useSelector((state: RootState) => state.filter.sortOrder); // 1. Обробник для нативного <select> (очікує подію)

  const handleSelectFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value as SortBy;
    dispatch(setSortBy(newSortBy));
  }; // 2. НОВИЙ Обробник для CustomSelect (очікує лише значення)

  const handleCustomSelectFieldChange = (value: string) => {
    const newSortBy = value as SortBy;
    dispatch(setSortBy(newSortBy));
  };

  const handleOrderToggle = () => {
    dispatch(setSortOrder(currentSortOrder === "asc" ? "desc" : "asc"));
  };

  const sortOptions = [
    { value: "date", label: t("history.sort.by.date") },
    { value: "duration", label: t("history.sort.by.duration") },
    { value: "wpm", label: t("history.sort.by.wpm") },
    { value: "accuracy", label: t("history.sort.by.accuracy") },
  ];

  return (
    <div className="sort-container">
      <select onChange={handleSelectFieldChange} value={currentSortBy} className="sort-select-field" id="sort">
        <option value="date">{t("history.sort.by.date")}</option>
        <option value="duration">{t("history.sort.by.duration")}</option>
        <option value="wpm">{t("history.sort.by.speed")}</option>
        <option value="accuracy">{t("history.sort.by.accuracy")}</option>
      </select>
      <CustomSelect options={sortOptions} currentOption={currentSortBy} onChange={handleCustomSelectFieldChange} />
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
