import { useState, useRef, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import FocusLock from "react-focus-lock";
import "./CustomSelect.css";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useSelectKeyboardNavigation } from "../../hooks/useKeyboardNavigation";

type Option = { label: string; value: string };

type CustomSelectProps = {
  options: Option[];
  currentOption: string;
  onChange: (value: string) => void;
};

export const CustomSelect = ({ options, currentOption, onChange }: CustomSelectProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, () => setOpen(false));

  useSelectKeyboardNavigation(wrapperRef, menuRef, open, setOpen);

  return (
    <div ref={wrapperRef}>
      <CustomSelectControl style="custom-select-control" open={open} forElement="custom-select-menu" setOpen={setOpen}>
        <svg width={24} height={24}>
          <use href="./src/assets/icons.svg#sort-icon" />
        </svg>
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

type CustomOptionProps = {
  style: string;
  option: Option;
  currentOption: string;
  onChange: (value: string) => void;
  setOpen: (isOpen: boolean) => void;
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

type CustomSelectControlProps = {
  style: string;
  open: boolean;
  forElement: string;
  children: ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
