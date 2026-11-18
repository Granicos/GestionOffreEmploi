import { useEffect, useState } from "react";
import { getCategories } from "../services/jobService";

export default function NavBarFiltrage({
  selectedDomaine,
  onDomaineChange,
  searchTerm,
  onSearchTermChange,
}) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setError("Impossible de charger les catégories."));
  }, []);

  return (
    <aside className="col-12 col-md-4 col-lg-3 mb-4">
      <div className="filter-panel card shadow-sm rounded-4 p-3 text-start">
        <div className="mb-4">
          <label htmlFor="job-search" className="form-label fw-semibold">
            🔎 Rechercher
          </label>
          <input
            id="job-search"
            type="search"
            className="form-control rounded-pill px-3"
            placeholder="Ex. développeur, React, Python"
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
          />
        </div>

        <nav aria-label="Filtrer les offres par domaine">
          <h2 className="h6 fw-bold text-uppercase text-secondary mb-3">
            Domaines
          </h2>
          {error && <p className="text-danger">{error}</p>}

          <div className="d-flex flex-row flex-md-column gap-2 overflow-auto pb-2">
            <button
              type="button"
              className={`category-btn btn rounded-pill text-nowrap text-md-start ${
                selectedDomaine === "" ? "active" : ""
              }`}
              aria-pressed={selectedDomaine === ""}
              onClick={() => onDomaineChange("")}
            >
              Tous les domaines
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`category-btn btn rounded-pill text-nowrap text-md-start ${
                  selectedDomaine === category.nom ? "active" : ""
                }`}
                aria-pressed={selectedDomaine === category.nom}
                onClick={() => onDomaineChange(category.nom)}
              >
                {category.nom}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}
