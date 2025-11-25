import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FocusLock from "react-focus-lock";
import "./CustomSelect.css";

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

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={wrapperRef}>
      {/* <div
        className={`custom-select ${open ? "open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
        role="combobox"
        aria-haspopup="listbox"
        tabIndex={0}
      >
        <svg width={24} height={24}>
          <use href="./src/assets/icons.svg#sort-icon" />
        </svg>
        <span>{t(`history.sort.by.${currentOption}`)}</span>
      </div> */}
      <button
        className={`custom-select ${open ? "open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        type="button"
        aria-controls="custom-select-menu"
        onClick={() => setOpen((prev) => !prev)}
      >
        <svg width={24} height={24}>
          <use href="./src/assets/icons.svg#sort-icon" />
        </svg>
        <span>{t(`history.sort.by.${currentOption}`)}</span>
      </button>

      {open && (
        <FocusLock disabled={!open}>
          <div className="custom-select-menu" id="custom-select-menu" role="listbox">
            {options.map((option) => (
              // <div
              //   key={option.value}
              //   className={`custom-select-option ${option.value === currentOption ? "selected" : ""}`}
              //   onClick={() => {
              //     onChange(option.value);
              //     setOpen(false);
              //   }}
              //   onKeyDown={(e) => {
              //     if (e.key === "Enter" || e.key === " ") {
              //       e.preventDefault();
              //       onChange(option.value);
              //       setOpen(false);
              //     }
              //   }}
              //   tabIndex={0}
              //   role="option"
              //   aria-selected={option.value === currentOption}
              // >
              <button
                key={option.value}
                className={`custom-select-option ${option.value === currentOption ? "selected" : ""}`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                type="button"
                role="option"
                aria-selected={option.value === currentOption}
              >
                {option.label}
              </button>
              // </div>
            ))}
          </div>
        </FocusLock>
      )}
    </div>
  );
};
