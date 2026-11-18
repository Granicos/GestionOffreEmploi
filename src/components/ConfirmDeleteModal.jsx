import { useEffect } from "react";


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
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDeleting) {
          onCancel();
        }
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-start">
          <div className="modal-header">
            <h5 id="confirm-delete-title" className="modal-title">
              Confirmer la suppression
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Fermer"
              onClick={onCancel}
              disabled={isDeleting}
            />
          </div>
          <div className="modal-body">
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <p className="mb-0">
              Voulez-vous vraiment supprimer l&apos;offre{" "}
              <strong>{job.titre}</strong>
              {job.entreprise ? ` (${job.entreprise})` : ""} ?
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isDeleting}
            >
              Annuler
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Suppression..." : "Supprimer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
