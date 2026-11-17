import { useEffect, useState } from "react";
import { getCategories } from "../services/jobService";

export default function NavBarFiltrage({ selectedDomaine, onDomaineChange }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setError("Impossible de charger les catégories."));
  }, []);

  return (
    <aside className="col-12 col-md-3 col-lg-2 mb-4">
      <nav aria-label="Filtrer les offres par domaine">
        <h2 className="h5 mb-3">Filtrer par domaine</h2>
        {error && <p className="text-danger">{error}</p>}
        <div className="list-group">
          <button
            type="button"
            className={`list-group-item list-group-item-action ${
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
              className={`list-group-item list-group-item-action ${
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
    </aside>
  );
}