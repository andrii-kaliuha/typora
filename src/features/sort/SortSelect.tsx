import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import FocusLock from "react-focus-lock";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useSelectKeyboardNavigation } from "../../hooks/useKeyboardNavigation";
import type { CustomSelectControlProps, CustomSelectProps, CustomOptionProps } from "../../types/SortTypes";
import "./SortSelect.css";
import { Icon } from "../../shared/Icon";

export const SortSelect = ({ options, currentOption, onChange }: CustomSelectProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside({ ref: wrapperRef, handler: () => setOpen(false) });
  useSelectKeyboardNavigation({ wrapperRef, menuRef, isOpen: open, setOpen: setOpen });

  return (
    <div ref={wrapperRef}>
      <CustomSelectControl style="custom-select-control" open={open} forElement="custom-select-menu" setOpen={setOpen}>
        <Icon width={24} height={24} icon="sort-icon" />
        <span className="current-option">{t(`history.sort.by.${currentOption}`)}</span>
      </CustomSelectControl>

      {open && (
        <FocusLock disabled={!open}>
          <div id="custom-select-menu" role="listbox" ref={menuRef}>
            {options.map((option) => (
              <CustomOption
                key={option.value}
                style="custom-select-option"
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

export const CustomOption = ({ style, option, currentOption, onChange, setOpen }: CustomOptionProps) => {
  const isSelected = option.value === currentOption;

  const handleClick = () => {
    onChange(option.value);
    setOpen(false);
  };

  return (
    <button className={`${style} ${isSelected ? "selected" : ""}`} onClick={handleClick} type="button" role="option" aria-selected={isSelected}>
      {option.label}
    </button>
  );
};

export const CustomSelectControl = ({ style, open, forElement, children, setOpen }: CustomSelectControlProps) => {
  return (
    <button
      className={`${style} ${open ? "open" : ""}`}
      aria-haspopup="listbox"
      aria-expanded={open}
      type="button"
      aria-controls={forElement}
      onClick={() => setOpen((prev) => !prev)}
    >
      {children}
    </button>
  );
};
