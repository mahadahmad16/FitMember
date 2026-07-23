function Modal({
  show,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  confirmVariant = "danger",
  cancelText = "Cancel",
}) {
  if (!show) return null;

  return (
    <div className="app-modal-backdrop" onClick={onClose}>
      <div
        className="app-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="app-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="app-modal__header">
          <h5 id="app-modal-title" className="app-modal__title">
            {title}
          </h5>
          <button
            type="button"
            className="app-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="app-modal__body">{children}</div>

        <div className="app-modal__footer">
          <button type="button" className="btn-plate btn-plate--outline" onClick={onClose}>
            {cancelText}
          </button>
          {onConfirm && (
            <button
              type="button"
              className={`btn-plate ${
                confirmVariant === "danger" ? "btn-plate--danger" : "btn-plate--solid"
              }`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;