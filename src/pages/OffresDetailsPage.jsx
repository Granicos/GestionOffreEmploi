import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getJobById } from "../services/jobService";

export default function OffresDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");

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
          <button className="btn btn-primary m-4">Modifier l'Offre</button>
          <button className="btn btn-primary m-4">Supprimer l'Offre</button>
        </div>
      </article>
    </main>
  );
}
