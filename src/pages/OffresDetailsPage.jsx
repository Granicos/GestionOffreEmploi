import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router";
import { deleteJob, getJobById } from "../services/jobService";
import "../styles/theme.css";
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
      <main className="container-xxl py-5 text-center">
        <p className="alert alert-danger rounded-4 shadow-sm">{error}</p>
        <Link to="/" className="btn btn-outline-grad rounded-pill px-4">
          ← Retour aux offres
        </Link>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="container-xxl py-5 text-center">
        <div className="spinner-border text-primary mb-3" role="status" />
        <p className="text-secondary">Chargement de l'offre...</p>
      </main>
    );
  }

  const infos = [
    { icon: "🏢", label: "Entreprise", value: job.entreprise },
    { icon: "🗂️", label: "Domaine", value: job.domaine },
    { icon: "📍", label: "Localisation", value: job.localisation },
    { icon: "📄", label: "Type de contrat", value: job.typeContrat },
    { icon: "💶", label: "Salaire", value: job.salaire },
    { icon: "📅", label: "Publiée le", value: job.datePublication },
  ];

  return (
    <main className="container-xxl py-4">
      <Link to="/" className="btn btn-outline-grad rounded-pill px-4 mb-4">
        ← Retour aux offres
      </Link>

      {/* En-tête */}
      <header className="hero rounded-4 p-4 p-md-5 mb-4">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
        <p className="text-uppercase fw-semibold small mb-2">
          Offre n°{job.id}
        </p>
        <h1 className="display-5 fw-bold mb-3">{job.titre}</h1>
        <span
          className={`badge rounded-pill px-3 py-2 ${
            job.disponible
              ? "text-bg-success-subtle text-success-emphasis"
              : "text-bg-danger-subtle text-danger-emphasis"
          }`}
        >
          <span
            className={job.disponible ? "dot-available" : "dot-unavailable"}
          />
          {job.disponible ? "Disponible" : "Non disponible"}
        </span>
      </header>

      {/* Informations clés */}
      <section className="row g-3 mb-4">
        {infos.map((info, index) => (
          <div key={info.label} className="col-12 col-sm-6 col-lg-4">
            <div
              className="job-card card h-100 border-0 shadow-sm rounded-4"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="card-body d-flex align-items-center gap-3">
                <div className="job-avatar fs-4 rounded-3 px-3 py-2">
                  {info.icon}
                </div>
                <div className="text-start">
                  <div className="text-secondary small">{info.label}</div>
                  <div className="fw-bold">{info.value || "—"}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Compétences */}
      <section className="filter-panel card shadow-sm rounded-4 p-4 mb-4 text-start">
        <h2 className="h5 fw-bold mb-3">🛠️ Compétences</h2>
        {job.competences?.length ? (
          <div className="d-flex flex-wrap gap-2">
            {job.competences.map((competence) => (
              <span
                key={competence}
                className="badge rounded-pill bg-primary-subtle text-primary-emphasis fs-6 fw-semibold px-3 py-2"
              >
                {competence}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-secondary mb-0">Aucune compétence renseignée</p>
        )}
      </section>

      {/* Description */}
      <section className="filter-panel card shadow-sm rounded-4 p-4 mb-4 text-start">
        <h2 className="h5 fw-bold mb-3">📝 Description</h2>
        <p className="mb-0">{job.description}</p>
      </section>

      {/* Actions */}
      {user && (
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Link
            to={`/edit-job/${job.id}`}
            className="btn btn-grad rounded-pill px-4 py-2"
          >
            ✏️ Modifier l'offre
          </Link>
          <button
            type="button"
            className="btn btn-outline-danger rounded-pill px-4 py-2"
            onClick={() => handleRequestDelete(job)}
          >
            🗑️ Supprimer l'offre
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
    </main>
  );
}
