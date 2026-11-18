import { useEffect } from "react";
import "../styles/theme.css";

export default function ConfirmDeleteModal({
  job,
  isDeleting,
  errorMessage,
  onCancel,
  onConfirm,
}) {
  useEffect(() => {
    if (!job) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !isDeleting) {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [job, isDeleting, onCancel]);

  if (!job) return null;

  return (
    <div
      className="modal modal-overlay fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDeleting) {
          onCancel();
        }
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-pop border-0 rounded-4 shadow-lg overflow-hidden text-start">
          <div className="modal-body p-4">
            <div className="d-flex align-items-start gap-3 mb-3">
              <div className="icon-circle bg-danger-subtle">🗑️</div>
              <div className="flex-grow-1">
                <h5 id="confirm-delete-title" className="fw-bold mb-1">
                  Confirmer la suppression
                </h5>
                <p className="text-secondary small mb-0">
                  Cette action est définitive.
                </p>
              </div>
              <button
                type="button"
                className="btn-close"
                aria-label="Fermer"
                onClick={onCancel}
                disabled={isDeleting}
              />
            </div>

            {errorMessage && (
              <div className="alert alert-danger rounded-4" role="alert">
                {errorMessage}
              </div>
            )}

            <p className="mb-0">
              Voulez-vous vraiment supprimer l&apos;offre{" "}
              <strong>{job.titre}</strong>
              {job.entreprise ? ` (${job.entreprise})` : ""} ?
            </p>
          </div>

          <div className="modal-footer border-0 bg-body-tertiary px-4 py-3">
            <button
              type="button"
              className="btn btn-light border rounded-pill px-4"
              onClick={onCancel}
              disabled={isDeleting}
            >
              Annuler
            </button>
            <button
              type="button"
              className="btn btn-danger rounded-pill px-4"
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                />
              )}
              {isDeleting ? "Suppression..." : "Supprimer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
