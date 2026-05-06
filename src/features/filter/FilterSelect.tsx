import { useState, useRef } from "react";
import FocusLock from "react-focus-lock";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useSelectKeyboardNavigation } from "../../hooks/useKeyboardNavigation";
import { CustomOption, CustomSelectControl } from "../../shared/CustomSelect";
import type { CustomSelectProps } from "../../types/SortTypes";
import "./FilterSelect.css";

export const FilterSelect = ({ options, currentOption, onChange }: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside({ ref: wrapperRef, handler: () => setOpen(false) });
  useSelectKeyboardNavigation({ wrapperRef, menuRef, isOpen: open, setOpen: setOpen });

  return (
    <div ref={wrapperRef} className="filter-select-wrapper">
      <CustomSelectControl style="filter-select-control" open={open} forElement="filter-select-menu" setOpen={setOpen}>
        <span>{currentOption}</span>
      </CustomSelectControl>

      {open && (
        <FocusLock disabled={!open}>
          <div className="filter-select-menu" ref={menuRef}>
            {options.map((option) => (
              <CustomOption
                key={option.value}
                style="filter-select-option"
                option={option}
                currentOption={currentOption}
                onChange={onChange}
                setOpen={setOpen}
              />
            ))}
          </div>
        </FocusLock>
      )}
    </div>
  );
};
