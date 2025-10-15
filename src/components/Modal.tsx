import "./Modal.css";
import { useState } from "react";

type ModalProps = { isOpen: boolean; onClose: () => void; title: string };

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
  const [customText, setCustomText] = useState("");

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
        <h3 className="modal-title">{title}</h3>
        <form onSubmit={handleFormSubmit}>
          <textarea
            name="custom-text"
            placeholder="Введіть сюди власний текст..."
            rows={8}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
          ></textarea>

          <div className="modal-footer">
            <button type="button" onClick={handleCancel} className="modal-cancel-btn">
              Скасувати
            </button>

            <button type="submit" className="modal-submit-btn" disabled={customText.trim() === ""}>
              Відправити
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
