import { useState, useRef } from "react";
import FocusLock from "react-focus-lock";
import "./CustomSelect2.css";
import { useClickOutside } from "../../hooks/useClickOutside";
import { CustomOption, CustomSelectControl } from "./CustomSelect";
import { useSelectKeyboardNavigation } from "../../hooks/useKeyboardNavigation";

type Option = { value: string; label: string };

type CustomSelectProps = {
  options: Option[];
  currentOption: string;
  onChange: (value: string) => void;
};

export const CustomSelect2 = ({ options, currentOption, onChange }: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, () => setOpen(false));

  useSelectKeyboardNavigation(wrapperRef, menuRef, open, setOpen);

  return (
    <div ref={wrapperRef} className="cs-wrapper">
      <CustomSelectControl style="cs-control" open={open} forElement="cs-menu" setOpen={setOpen}>
        <span>{currentOption}</span>
      </CustomSelectControl>

      {open && (
        <FocusLock disabled={!open}>
          <div id="cs-menu" ref={menuRef}>
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
