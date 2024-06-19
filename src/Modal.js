import React from "react";
import "./styles/Modal.css";

export default function Modal({ title, message, onClose }) {
  return (
    <div className="error-modal">
      <div className="modalBackdrop">
        <div className="modal-container">
          <h2 className="modal-title">{title}</h2>
          <div className="error-msg">
            <p>{message}</p>
          </div>
          <div className="modal-close">
            <button type="button" onClick={onClose}>
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
