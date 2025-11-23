import { useTranslation } from "react-i18next";
import { Modal } from "./Modal";
import "./ErrorModal.css";

type ModalProps = { isOpen: boolean; onClose: () => void; message: string | null };

export const ErrorModal = ({ isOpen, onClose, message }: ModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-error" onClick={(e) => e.stopPropagation()}>
        <div className="icon-error">
          <svg width={72} height={72}>
            <use href={`./src/assets/icons.svg#error-icon`} />
          </svg>
        </div>

        <h2 className="modal-error-title">{t("modal.error.title")}</h2>
        <p className="modal-error-message">{message}</p>

        <button type="button" onClick={onClose} className="close-button">
          {t("modal.error.close")}
        </button>
      </div>
    </Modal>
  );
};
