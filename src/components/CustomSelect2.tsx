import { useState, useRef, useEffect } from "react";
import FocusLock from "react-focus-lock";
import "./CustomSelect2.css";

type Option = { label: string; value: string };

type CustomSelectProps = {
  options: Option[];
  currentOption: string;
  onChange: (value: string) => void;
};

export const CustomSelect2 = ({ options, currentOption, onChange }: CustomSelectProps) => {
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
    <div ref={wrapperRef} className="cs-wrapper">
      <div
        className={`cs-control ${open ? "open" : ""}`}
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
        <span>{currentOption}</span>
      </div>

      {open && (
        <FocusLock disabled={!open}>
          <div className="cs-menu">
            {options.map((option) => (
              <div
                key={option.value}
                className={`cs-option ${option.value === currentOption ? "selected" : ""}`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onChange(option.value);
                    setOpen(false);
                  }
                }}
                tabIndex={0}
                role="option"
                aria-selected={option.value === currentOption}
              >
                {option.label}
              </div>
            ))}
          </div>
        </FocusLock>
      )}
    </div>
  );
};
