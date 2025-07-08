import { useState } from "react";
import styles from "./Accordion.module.css";

export type AccordionItemProps = { title: string; content: string };

export const AccordionItem = ({ title, content }: AccordionItemProps) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <li className={styles.accordionItem}>
      <div className={styles.accordionHeader} onClick={toggle}>
        {title}
        <span className={`${styles.arrow} ${open ? styles.arrowOpen : ""}`}>▼</span>
      </div>
      <div className={`${styles.accordionContent} ${open ? styles.accordionContentOpen : ""}`}>{content}</div>
    </li>
  );
};
