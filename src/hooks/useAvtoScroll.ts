// // 6. Логіка автоматичного прокручування з фіксованою висотою рядка
// useEffect(() => {
//   const container = textRef.current;
//   const cursor = cursorRef.current;

//   if (container && cursor) {
//     // 1. Позиції
//     const cursorTop = cursor.offsetTop; // Позиція курсора відносно ВЕРХУ контейнера
//     const currentScroll = container.scrollTop; // Поточна прокрутка контейнера
//     const containerHeight = container.clientHeight; // Висота видимої області контейнера

//     // 2. Межі видимої області
//     // Нижня межа - це місце, де курсор виходить за видиму область, якщо він знаходиться в останньому видимому рядку.
//     // Встановлюємо межу на 1.5 висоти рядка від низу для запасу
//     const scrollThreshold = containerHeight - LINE_HEIGHT * 1.5;

//     // 3. Перевірка та прокручування

//     // Якщо курсор знаходиться нижче порогу видимості
//     // Тобто, якщо позиція курсора (відносно верху) мінус поточна прокрутка (де починається видима область)
//     // перевищує поріг (тобто курсор знаходиться в невидимій нижній частині)
//     if (cursorTop - currentScroll > scrollThreshold) {
//       // Прокрутити так, щоб курсор став видимим.
//       // Нова прокрутка = Позиція курсора - (Висота контейнера - 2 рядки)
//       // Ми зміщуємо скрол на 2 рядки назад від низу
//       container.scrollTop = cursorTop - (containerHeight - 2 * LINE_HEIGHT);

//       // Якщо курсор знаходиться вище верхньої межі (наприклад, при Backspace)
//     } else if (cursorTop < currentScroll) {
//       // Прокрутити так, щоб курсор був на самому верху видимої області
//       container.scrollTop = cursorTop;
//     }
//   }
// }, [typedText.length]); // Запускаємо при кожному введенні символу

import { useEffect, type RefObject } from "react";

/**
 * Хук для автоматичного прокручування контейнера, коли цільовий елемент (курсор)
 * виходить за межі видимості, враховуючи фіксовану висоту рядка.
 *
 * @param scrollContainerRef Ref прокручуваного елемента (div.text).
 * @param targetElementRef Ref цільового елемента (курсора).
 * @param triggerDependency Змінна, яка викликає повторний запуск (наприклад, typedText.length).
 * @param lineHeight Фіксована висота одного рядка в пікселях.
 */
export const useAutoScroll = (
  scrollContainerRef: RefObject<HTMLElement>,
  targetElementRef: RefObject<HTMLElement>,
  triggerDependency: number,
  lineHeight: number = 48
) => {
  useEffect(() => {
    const container = scrollContainerRef.current;
    const cursor = targetElementRef.current;

    if (!container || !cursor) return;

    const cursorTop = cursor.offsetTop;
    const currentScroll = container.scrollTop;
    const containerHeight = container.clientHeight;

    // Нижня межа: курсор має бути повністю видимий + невелика точність
    const lowerBoundThreshold = currentScroll + containerHeight - 1;

    // --- 1. Прокручування ВНИЗ ---
    // Якщо нижня межа курсора (cursorTop + LINE_HEIGHT) виходить за видиму область
    if (cursorTop + lineHeight > lowerBoundThreshold) {
      // Прокручуємо контейнер вниз на один рядок, щоб показати новий рядок.
      container.scrollTop = currentScroll + lineHeight;
      return;
    }

    // --- 2. Прокручування ВГОРУ (для Backspace) ---
    // Якщо курсор знаходиться вище видимої верхньої межі
    if (cursorTop < currentScroll) {
      // Прокручуємо контейнер на один рядок вгору
      container.scrollTop = currentScroll - lineHeight;
    }
  }, [triggerDependency, lineHeight]); // Перезапускаємо, коли текст змінюється
};
