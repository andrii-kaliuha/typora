import type { CustomOptionProps, CustomSelectControlProps } from "../../features/sort/types";

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
