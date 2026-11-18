import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router";
import { deleteJob, getJobById } from "../services/jobService";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { useAuth } from "../hooks/useAuth";

export default function OffresDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();
  const [jobToDelete, setJobToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

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
      navigate("/");
    } catch (error) {
      console.error(error);
      setDeleteError("Impossible de supprimer cette offre d'emploi.");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    let active = true;

    getJobById(id)
      .then((data) => {
        if (active) setJob(data);
      })
      .catch((requestError) => {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Impossible de charger cette offre.",
          );
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (error) {
    return (
      <main className="container mt-5">
        <p className="alert alert-danger">{error}</p>
        <Link to="/" className="btn btn-outline-primary">
          Retour aux offres
        </Link>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="container mt-5">
        <p>Chargement de l'offre...</p>
      </main>
    );
  }

  return (
    <main className="container mt-5">
      <Link to="/" className="btn btn-outline-primary mb-4">
        Retour aux offres
      </Link>
      <article className="card">
        <div className="card-body">
          <h1 className="card-title mb-4">{job.titre}</h1>
          <dl className="row">
            <dt className="col-sm-3">Identifiant</dt>
            <dd className="col-sm-9">{job.id}</dd>

            <dt className="col-sm-3">Entreprise</dt>
            <dd className="col-sm-9">{job.entreprise}</dd>

            <dt className="col-sm-3">Domaine</dt>
            <dd className="col-sm-9">{job.domaine}</dd>

            <dt className="col-sm-3">Localisation</dt>
            <dd className="col-sm-9">{job.localisation}</dd>

            <dt className="col-sm-3">Type de contrat</dt>
            <dd className="col-sm-9">{job.typeContrat}</dd>

            <dt className="col-sm-3">Salaire</dt>
            <dd className="col-sm-9">{job.salaire}</dd>

            <dt className="col-sm-3">Date de publication</dt>
            <dd className="col-sm-9">{job.datePublication}</dd>

            <dt className="col-sm-3">Disponibilité</dt>
            <dd className="col-sm-9">{job.disponible ? "Oui" : "Non"}</dd>

            <dt className="col-sm-3">Compétences</dt>
            <dd className="col-sm-9">
              {job.competences?.length
                ? job.competences.join(", ")
                : "Aucune compétence renseignée"}
            </dd>
          </dl>

          <h2 className="h5">Description</h2>
          <p className="card-text">{job.description}</p>
          {user && (
            <div>
              <Link to={`/edit-job/${job.id}`} className="btn btn-primary m-4">
                Modifier l'Offre
              </Link>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => handleRequestDelete(job)}
              >
                Supprimer l'Offre
              </button>

              <ConfirmDeleteModal
                job={jobToDelete}
                isDeleting={isDeleting}
                errorMessage={deleteError}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
              />
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
