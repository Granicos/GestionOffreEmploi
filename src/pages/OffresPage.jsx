import { useCallback, useEffect, useState } from "react";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import JobCard from "../components/JobCard";
import NavBarFiltrage from "../components/NavBarFiltrage";
import { deleteJob, getJobs } from "../services/jobService";

export default function OffresPage() {
  const [jobs, setJobs] = useState([]);
  const [domaine, setDomaine] = useState("");
  const [loadError, setLoadError] = useState("");
  const [jobToDelete, setJobToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

  useEffect(() => {
    let isCancelled = false;

    getJobs({ domaine })
      .then(({ data }) => {
        if (!isCancelled) {
          setLoadError("");
          setJobs(data);
        }
      })
      .catch((error) => {
        console.error(error);
        if (!isCancelled) {
          setLoadError(
            "Impossible de charger les offres. Vérifiez que json-server est lancé sur le port 3000.",
          );
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [domaine]);

  const handleRequestDelete = (job) => {
    setDeleteError("");
    setDeleteSuccess("");
    setJobToDelete(job);
  };

  const handleCancelDelete = useCallback(() => {
    if (isDeleting) return;
    setDeleteError("");
    setJobToDelete(null);
  }, [isDeleting]);

  const handleConfirmDelete = async () => {
    if (!jobToDelete) return;

    try {
      setIsDeleting(true);
      setDeleteError("");
      await deleteJob(jobToDelete.id);
      setJobs((prevJobs) =>
        prevJobs.filter((item) => String(item.id) !== String(jobToDelete.id)),
      );
      setDeleteSuccess(`L'offre "${jobToDelete.titre}" a été supprimée.`);
      setJobToDelete(null);
    } catch (error) {
      console.error(error);
      setDeleteError("Impossible de supprimer cette offre d'emploi.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container-fluid mt-5 px-4 text-center">
      <h1>Bienvenue sur la Recherche d'Offres d'Emploi</h1>

      {loadError && (
        <div
          className="alert alert-danger mx-auto mt-3"
          style={{ maxWidth: "600px" }}
          role="alert"
        >
          {loadError}
        </div>
      )}

      {deleteSuccess && (
        <div
          className="alert alert-success alert-dismissible fade show mx-auto mt-3"
          style={{ maxWidth: "600px" }}
          role="alert"
        >
          {deleteSuccess}
          <button
            type="button"
            className="btn-close"
            aria-label="Fermer"
            onClick={() => setDeleteSuccess("")}
          />
        </div>
      )}

      <div className="row">
        <NavBarFiltrage
          selectedDomaine={domaine}
          onDomaineChange={setDomaine}
        />
        <main className="col-12 col-md-9 col-lg-10">
          <div className="row">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onDelete={handleRequestDelete}
              />
            ))}
          </div>
        </main>
      </div>

      <ConfirmDeleteModal
        job={jobToDelete}
        isDeleting={isDeleting}
        errorMessage={deleteError}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
