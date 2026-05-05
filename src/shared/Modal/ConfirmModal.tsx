import { useTranslation } from "react-i18next";
import { Modal } from "./Modal";
import "./ConfirmModal.css";
import { Icon } from "../Icon";

type ConfirmModalProps = { isOpen: boolean; message: string; onClose: () => void; onConfirm: () => void };

export const ConfirmModal = ({ isOpen, message, onClose, onConfirm }: ConfirmModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-confirm" onClick={(e) => e.stopPropagation()}>
        <div className="icon-warning">
          <Icon width={90} height={90} icon="warning-icon" />
        </div>

        <h2 className="modal-confirm-title">{t("modal.confirm.title")}</h2>
        {/* <div> */}
        <p className="modal-confirm-message">{message}</p>
        {/* <p className="modal-confirm-action">{t("modal.confirm.action")}</p> */}
        {/* </div> */}

        <div className="modal-buttons-container">
          <button type="button" onClick={onClose} className="cancel-button">
            {t("modal.confirm.cancel")}
          </button>

          <button type="button" onClick={() => onConfirm()} className="confirm-button">
            {t("modal.confirm.confirm")}
          </button>
        </div>
      </div>
    </Modal>
  );
};
