import { useTranslation } from "react-i18next";
import { useState } from "react";
import "./Modal.css";

type ModalProps = { isOpen: boolean; onClose: () => void };

export const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [customText, setCustomText] = useState("");
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      setCustomText("");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // onSubmit(customText);

    setCustomText("");
    onClose();
  };

  const handleCancel = () => {
    setCustomText("");
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <h3 className="modal-title"> {t("modal.title")}</h3>
        <form onSubmit={handleFormSubmit}>
          <textarea
            name="custom-text"
            placeholder={t("modal.placeholder")}
            rows={10}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
          ></textarea>

          <div className="modal-footer">
            <button type="button" onClick={handleCancel} className="cancel-button">
              {t("modal.cancel")}
            </button>

            <button type="submit" onClick={handleCancel} className="confirm-button">
              {t("modal.confirm")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
