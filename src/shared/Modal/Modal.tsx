import { useEffect, type ReactNode } from "react";
import FocusLock from "react-focus-lock";
import "./Modal.css";

type ModalProps = { isOpen: boolean; onClose: () => void; children: ReactNode };

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");

    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <FocusLock disabled={!isOpen}>
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        {children}
      </div>
    </FocusLock>
  );
};
