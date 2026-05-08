import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import FocusLock from "react-focus-lock";
import { useClickOutside } from "../../shared/hooks/useClickOutside";
import { useSelectKeyboardNavigation } from "../../shared/hooks/useKeyboardNavigation";
import "./SortSelect.css";
import { Icon } from "../../shared/ui/Icon";
import { CustomOption, CustomSelectControl } from "../../shared/ui/CustomSelect";
import type { CustomSelectProps } from "./types";

export const SortSelect = ({ options, currentOption, onChange }: CustomSelectProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside({ ref: wrapperRef, handler: () => setOpen(false) });
  useSelectKeyboardNavigation({ wrapperRef, menuRef, isOpen: open, setOpen: setOpen });

  return (
    <div ref={wrapperRef}>
      <CustomSelectControl style="sort-select-control" open={open} forElement="sort-select-menu" setOpen={setOpen}>
        <Icon width={24} height={24} icon="sort-icon" />
        <span className="current-option">{t(`history.sort.by.${currentOption}`)}</span>
      </CustomSelectControl>

      {open && (
        <FocusLock disabled={!open}>
          <div className="sort-select-menu" role="listbox" ref={menuRef}>
            {options.map((option) => (
              <CustomOption
                key={option.value}
                style="sort-select-option"
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
