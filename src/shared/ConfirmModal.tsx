import { useTranslation } from "react-i18next";
import { useEffect } from "react";

type ConfirmModalProps = { isOpen: boolean; title: string; message: string; onConfirm: () => void; onClose: () => void };

export const ConfirmModal = ({ isOpen, title, message, onConfirm, onClose }: ConfirmModalProps) => {
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
            <use href={`./src/assets/icons.svg#warning-icon`} />
          </svg>
        </div>
        <h2 className="modal-confirm-title">{title}</h2>
        <p className="modal-confirm-message">{message}</p>

        <div className="modal-footer buttons-container">
          <button type="button" onClick={onClose} className="modal-button modal-cancel-button">
            {t("modal.cancel")}
          </button>

          <button type="button" onClick={() => onConfirm()} className="modal-button modal-confirm-button">
            {t("modal.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};
