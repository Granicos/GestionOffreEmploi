import { Link } from "react-router";

export default function JobCard({ job, index = 0 }) {
  const initial = job.titre?.charAt(0).toUpperCase() ?? "?";

  return (
    <div className="col-12 col-md-6 col-xl-4">
      <article
        className="job-card card h-100 border-0 shadow-sm rounded-4"
        style={{ animationDelay: `${Math.min(index, 12) * 70}ms` }}
      >
        <div className="card-body d-flex flex-column p-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div
              className="job-avatar fw-bold fs-4 rounded-3 px-3 py-2"
              aria-hidden="true"
            >
              {initial}
            </div>
            <div className="text-start">
              <h3 className="h5 fw-bold mb-1">{job.titre}</h3>
              <span className="text-secondary small">
                📍 {job.localisation}
              </span>
            </div>
          </div>

          <div className="mb-4 text-start">
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
          </div>

          <Link
            to={`/jobs/${job.id}`}
            className="btn btn-grad rounded-pill mt-auto"
          >
            Voir les détails →
          </Link>
        </div>
      </article>
    </div>
  );
}
