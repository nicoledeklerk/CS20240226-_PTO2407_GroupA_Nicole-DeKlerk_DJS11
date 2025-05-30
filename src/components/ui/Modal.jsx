
import './Modal.css'; 

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button" aria-label="Close modal">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
