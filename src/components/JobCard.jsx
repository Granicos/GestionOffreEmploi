import { Link } from "react-router";

export default function JobCard({ job, onDelete }) {
  return (
    <div className="col-6 col-md-2 col-lg-4 mb-4 text-center">
      <div
        className="card h-100 mx-auto"
        style={{ maxWidth: "460px", width: "100%" }}
      >
        {" "}
        <div className="card-body bg-light">
          <p className="card-text border rounded-pill p-4 m-4 ">
            {" "}
            Poste : {job.titre}
          </p>
          <p className="card-text border rounded-pill p-4 m-4  ">
            Localisation : {job.localisation}
          </p>

          <p className="card-text border rounded-pill p-4 m-4 ">
            Disponible : {job.disponible ? "Oui" : "Non"}
          </p>
          <Link to={`/jobs/${job.id}`} className="btn btn-primary">
            Voir Details
          </Link>
        </div>
        {onDelete && (
          <div className="card-footer bg-light border-0 pb-3">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onDelete(job)}
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
