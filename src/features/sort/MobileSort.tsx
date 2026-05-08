import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Modal } from "../../shared/ui/Modal/Modal";
import { useSelectKeyboardNavigation } from "../../shared/hooks/useKeyboardNavigation";
import { setSortBy, setSortOrder } from "../../store/filterSlice";
import type { MobileSortProps, SortBy, SortOrder } from "./types";
import "./MobileSort.css";
import { useTranslation } from "react-i18next";
import { CustomOption } from "../../shared/ui/CustomSelect";
import { Icon } from "../../shared/ui/Icon";

export const MobileSort = ({ open, onClose }: MobileSortProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentSortBy = useSelector((state: RootState) => state.filter.sortBy);
  const currentSortOrder = useSelector((state: RootState) => state.filter.sortOrder);

  const handleChangeSortBy = (value: string) => {
    const newSortBy = value as SortBy;
    dispatch(setSortBy(newSortBy));
  };

  const handleChangeSortOrder = (value: string) => {
    const newSortOrder = value as SortOrder;
    dispatch(setSortOrder(newSortOrder));
  };

  const sortByOptions = [
    { value: "date", label: t("history.sort.by.date") },
    { value: "duration", label: t("history.sort.by.duration") },
    { value: "wpm", label: t("history.sort.by.wpm") },
    { value: "accuracy", label: t("history.sort.by.accuracy") },
  ];

  const sortOrderOptions = [
    { value: "desc", label: t("history.sort.order.desc_short") },
    { value: "asc", label: t("history.sort.order.asc_short") },
  ];

  useSelectKeyboardNavigation({ wrapperRef, menuRef, isOpen: open, setOpen: onClose });

  return (
    <Modal isOpen={open} onClose={onClose}>
      {open && (
        <div className="mobile-sort-menu" role="listbox" ref={menuRef}>
          <div className="mobile-sort-header">
            <h3>{t("history.sort.title")}</h3>
            <button type="button" className="mobile-sort-close-button" onClick={onClose}>
              <Icon width={24} height={24} icon="close-icon" />
            </button>
          </div>

          {sortByOptions.map((option) => (
            <CustomOption
              key={option.value}
              style="mobile-sort-option"
              option={option}
              currentOption={currentSortBy}
              onChange={handleChangeSortBy}
              setOpen={onClose}
            />
          ))}

          <div className="divider"></div>

          {sortOrderOptions.map((option) => (
            <CustomOption
              key={option.value}
              style="mobile-sort-option"
              option={option}
              currentOption={currentSortOrder}
              onChange={handleChangeSortOrder}
              setOpen={onClose}
            />
          ))}
        </div>
      )}
    </Modal>
  );
};
