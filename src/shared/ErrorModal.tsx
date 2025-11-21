import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import "./Modal.css";

type ErrorModallProps = { isOpen: boolean; title: string; message: string; onClose: () => void };

export const ErrorModal = ({ isOpen, title, message, onClose }: ErrorModallProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-image">
          <svg width={72} height={72}>
            <use href={`./src/assets/icons.svg#error-icon`} />
          </svg>
        </div>
        <h2 className="modal-error-title">{title}</h2>
        <p className="modal-error-message">{message}</p>

        <div className="modal-footer buttons-container">
          <button type="button" onClick={onClose} className="modal-button modal-cancel-button">
            {t("modal.close")}
          </button>
        </div>
      </div>
    </div>
  );
};
