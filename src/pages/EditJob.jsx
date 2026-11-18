import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import JobForm from "../components/JobForm";
import { deleteJob, getJobById, updateJob } from "../services/jobService";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    let isCancelled = false;

    const fetchJob = async () => {
      try {
        setLoadingJob(true);
        setFetchError("");
        const data = await getJobById(id);
        if (!isCancelled) {
          setJob(data);
        }
      } catch (error) {
        console.error(error);
        if (!isCancelled) {
          setFetchError("Impossible de charger cette offre d'emploi.");
        }
      } finally {
        if (!isCancelled) {
          setLoadingJob(false);
        }
      }
    };

    fetchJob();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  const handleUpdateJob = async (updatedFields) => {
    await updateJob(id, updatedFields);
  };

  const handleCancelDelete = useCallback(() => {
    if (isDeleting) return;
    setDeleteError("");
    setShowDeleteModal(false);
  }, [isDeleting]);

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      setDeleteError("");
      await deleteJob(id);
      navigate("/");
    } catch (error) {
      console.error(error);
      setDeleteError("Impossible de supprimer cette offre d'emploi.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loadingJob) {
    return (
      <div className="container mt-5 text-center">
        <p>Chargement de l&apos;offre...</p>
      </div>
    );
  }

  if (fetchError || !job) {
    return (
      <div className="container mt-5" style={{ maxWidth: "700px" }}>
        <div className="alert alert-danger">
          {fetchError || "Offre d'emploi introuvable."}
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/")}
        >
          Retour à l&apos;accueil
        </button>
      </div>
    );
  }

  return (
    <>
      <JobForm
        key={job.id ?? id}
        title="Modifier l'offre d'emploi"
        submitLabel="Enregistrer les modifications"
        loadingLabel="Modification en cours..."
        successMessage="Offre modifiée"
        initialValues={job}
        onSubmit={handleUpdateJob}
      />

      <div className="container mb-5" style={{ maxWidth: "700px" }}>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => {
              setDeleteError("");
              setShowDeleteModal(true);
            }}
          >
            Supprimer cette offre
          </button>
        </div>
      </div>

      <ConfirmDeleteModal
        job={showDeleteModal ? job : null}
        isDeleting={isDeleting}
        errorMessage={deleteError}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
