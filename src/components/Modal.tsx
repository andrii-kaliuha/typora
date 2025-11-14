import "./Modal.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setCustomText, setTextType } from "../store/configSlice";

type ModalProps = { isOpen: boolean; onClose: () => void };

export const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [localText, setLocalText] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setLocalText("");
      onClose();
    }
  };

  const handleFormConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedText = localText.trimEnd();

    if (trimmedText) {
      dispatch(setCustomText(trimmedText));
      dispatch(setTextType("custom"));
    }

    setLocalText("");
    onClose();
  };

  const handleCancel = () => {
    setLocalText("");
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <h3 className="modal-title"> {t("modal.title")}</h3>
        <form onSubmit={handleFormConfirm}>
          <textarea
            name="custom-text"
            placeholder={t("modal.placeholder")}
            rows={10}
            value={localText}
            onChange={(e) => setLocalText(e.target.value)}
          ></textarea>

          <div className="modal-footer">
            <button type="button" onClick={handleCancel} className="cancel-button">
              {t("modal.cancel")}
            </button>

            <button type="submit" className="confirm-button">
              {t("modal.confirm")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
