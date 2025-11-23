import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setCustomText, setTextType } from "../store/configSlice";
import { Modal } from "../shared/Modal";
import "./CustomTextModal.css";

type CustomTextModalProps = { isOpen: boolean; onClose: () => void };

export const CustomTextModal = ({ isOpen, onClose }: CustomTextModalProps) => {
  const [localText, setLocalText] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleFormConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedText = localText.trimEnd();

    if (trimmedText) {
      dispatch(setCustomText(trimmedText));
      dispatch(setTextType("custom"));
    }

    handleClose();
  };

  const handleClose = () => {
    setLocalText("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="modal-container">
        <h3 className="modal-title"> {t("modal.custom-text.title")}</h3>
        <form onSubmit={handleFormConfirm}>
          <textarea
            name="custom-text"
            placeholder={t("modal.custom-text.placeholder")}
            rows={10}
            value={localText}
            onChange={(e) => setLocalText(e.target.value)}
          ></textarea>

          <div className="modal-footer">
            <button type="button" onClick={handleClose} className="cancel-button">
              {t("modal.custom-text.cancel")}
            </button>

            <button type="submit" className="confirm-button">
              {t("modal.custom-text.confirm")}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
