// // 1. Інтерфейси для TypeScript
// type Option = {
//   value: string;
//   label: string;
// };

// type CustomSelectProps = {
//   options: Option[];
//   initialValue?: string;
//   onSelect: (value: string) => void;
//   placeholder?: string;
// };

// export const CustomSelect: React.FC<CustomSelectProps> = ({ options, initialValue = "", onSelect, placeholder = "Виберіть елемент" }) => {
//   // Стан для відкритого/закритого списку
//   const [isOpen, setIsOpen] = useState(false);
//   // Стан для поточного вибраного значення
//   const [selected, setSelected] = useState(initialValue);

//   // Ref для відстеження компонента (потрібно для логіки "клік поза межами")
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   // Визначаємо мітку для відображення
//   const selectedLabel = options.find((opt) => opt.value === selected)?.label || (selected === "" ? placeholder : selected);

//   // 2. Логіка закриття при кліку поза межами компонента (Click Outside)
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []); // Пустий масив залежностей означає, що ефект запускається лише при монтуванні/демонтуванні

//   // 3. Обробник вибору опції
//   const handleOptionClick = (value: string) => {
//     setSelected(value);
//     onSelect(value); // Викликаємо callback для батьківського компонента
//     setIsOpen(false);
//   };

//   // Мінімальні інлайн-стилі для структури. Рекомендується додати класи для CSS Modules/Tailwind.
//   const baseStyles: React.CSSProperties = {
//     position: "relative",
//     width: "250px",
//     fontFamily: "sans-serif",
//   };

//   return (
//     <div className={`custom-select-wrapper ${isOpen ? "open" : ""}`} ref={wrapperRef} style={baseStyles}>
//       {/* Тригер (Кнопка) */}
//       <div
//         className="custom-select-trigger"
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           padding: "10px 15px",
//           border: "1px solid #ccc",
//           borderRadius: "4px",
//           cursor: "pointer",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           backgroundColor: "#fff",
//         }}
//       >
//         <span>{selectedLabel}</span>
//         {/* Імітація стрілки */}
//         <div
//           style={{
//             width: "0",
//             height: "0",
//             borderLeft: "5px solid transparent",
//             borderRight: "5px solid transparent",
//             borderTop: "5px solid #333",
//             transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
//             transition: "transform 0.2s",
//           }}
//         />
//       </div>

//       {/* Список опцій */}
//       {isOpen && (
//         <div
//           className="custom-options"
//           style={{
//             position: "absolute",
//             top: "100%",
//             left: "0",
//             right: "0",
//             zIndex: 10,
//             marginTop: "4px",
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//             backgroundColor: "#fff",
//             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//             maxHeight: "200px",
//             overflowY: "auto",
//           }}
//         >
//           {options.map((option) => (
//             <div
//               key={option.value}
//               className={`custom-option ${selected === option.value ? "selected" : ""}`}
//               onClick={() => handleOptionClick(option.value)}
//               style={{
//                 padding: "10px 15px",
//                 cursor: "pointer",
//                 backgroundColor: selected === option.value ? "#e9f5ff" : "transparent",
//                 // Hover стилі потрібно додати у зовнішньому CSS (наприклад, через CSS Modules)
//               }}
//             >
//               {option.label}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// import React, { useState, useRef, useEffect } from "react";
// Припускаємо, що цей CSS файл буде підключено (наприклад, import './CustomSelect.css';)

// 1. Інтерфейси для TypeScript
interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  initialValue?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ options, initialValue = "", onSelect, placeholder = "Виберіть елемент" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialValue);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === selected)?.label || (selected === "" ? placeholder : selected);

  // 2. Логіка закриття при кліку поза межами компонента (Click Outside)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Обробник вибору опції
  const handleOptionClick = (value: string) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    // Динамічний клас 'open' тепер керує відображенням
    <div className={`custom-select-wrapper ${isOpen ? "open" : ""}`} ref={wrapperRef}>
      {/* Тригер (Кнопка) */}
      <div className="custom-select-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="selected-label">{selectedLabel}</span>
        {/* Імітація стрілки */}
        <div className={`arrow ${isOpen ? "rotated" : ""}`} />
      </div>

      {/* Список опцій */}
      {isOpen && (
        <div className="custom-options">
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-option ${selected === option.value ? "selected" : ""}`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useRef, useState } from "react";

// const sortOptions = [
//   { value: "date", label: "Дата" },
//   { value: "duration", label: "Тривалість" },
//   { value: "wpm", label: "Швидкість" },
//   { value: "accuracy", label: "Точність" },
// ];

// export const SortComponent: React.FC = () => {
//   // 💡 У проєкті Typora (Redux Toolkit) це буде:
//   // const currentSort = useSelector(selectCurrentSort);
//   // const dispatch = useDispatch();
//   const [currentSort, setCurrentSort] = useState("date"); // Імітація Redux-стану

//   // 3. Обробник, який викликається при виборі нової опції
//   const handleSortChange = (selectedValue: string) => {
//     // Оновлюємо локальний стан (Імітація Redux)
//     setCurrentSort(selectedValue);

//     // 💡 У проєкті Typora (Redux Toolkit) це буде:
//     // dispatch(setSortType(selectedValue));

//     console.log("Нове сортування:", selectedValue);
//   };

//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//       <p style={{ margin: 0, fontWeight: 600 }}>Сортувати за:</p>
//       <CustomSelect options={sortOptions} initialValue={currentSort} onSelect={handleSortChange} placeholder="Оберіть тип" />

//       {/* Індикатор поточного вибору */}
//       {/* <p>Поточне значення: **{sortOptions.find((opt) => opt.value === currentSort)?.label || "Не вибрано"}**</p> */}
//     </div>
//   );
// };
