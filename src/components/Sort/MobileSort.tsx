import { useRef } from "react";
import { Modal } from "../Shared/Modal";
import { CustomOption } from "./CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setSortBy, setSortOrder, type SortBy } from "../../store/filterSlice";
import { useSelectKeyboardNavigation } from "../../hooks/useKeyboardNavigation";
import "./MobileSort.css";

export const MobileSort = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentSortBy = useSelector((state: RootState) => state.filter.sortBy);

  const currentSortOrder = useSelector((state: RootState) => state.filter.sortOrder);
  const isDescSelected = currentSortOrder === "desc";
  const isAscSelected = currentSortOrder === "asc";
  const handleDescOrder = () => dispatch(setSortOrder("desc"));
  const handleAscOrder = () => dispatch(setSortOrder("asc"));

  const handleCustomSelectFieldChange = (value: string) => {
    const newSortBy = value as SortBy;
    dispatch(setSortBy(newSortBy));
  };

  const sortOptions = [
    { value: "date", label: "За датою" },
    { value: "duration", label: "За тривалістю" },
    { value: "wpm", label: "За швидкістю" },
    { value: "accuracy", label: "За точністю" },
    // { value: "date", label: t("history.sort.by.date") },
    // { value: "duration", label: t("history.sort.by.duration") },
    // { value: "wpm", label: t("history.sort.by.wpm") },
    // { value: "accuracy", label: t("history.sort.by.accuracy") },
  ];

  useSelectKeyboardNavigation(wrapperRef, menuRef, open, onClose);

  return (
    <Modal isOpen={open} onClose={onClose}>
      {open && (
        <div id="custom-select-mobile-menu" role="listbox" ref={menuRef}>
          <div className="custom-select-header">
            <h3>Сортувати</h3>
            <button type="button" className="custom-select-close-button" onClick={onClose}>
              <svg width={24} height={24}>
                <use href="./src/assets/icons.svg#close-icon" />
              </svg>
            </button>
          </div>

          {sortOptions.map((option) => (
            <CustomOption
              key={option.value}
              style="custom-select-mobile-option"
              option={option}
              currentOption={currentSortBy}
              onChange={handleCustomSelectFieldChange}
              setOpen={onClose}
            />
          ))}

          <div className="divider"></div>

          <div className="select-buttons-container">
            <button type="button" className={`custom-select-mobile-option ${isDescSelected ? "selected" : ""}`} onClick={handleDescOrder}>
              За зростанням
            </button>
            <button type="button" className={`custom-select-mobile-option ${isAscSelected ? "selected" : ""}`} onClick={handleAscOrder}>
              За спаданням
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
