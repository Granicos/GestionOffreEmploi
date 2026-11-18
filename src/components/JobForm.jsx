import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "../styles/theme.css";

const DOMAINES = [
  "Développement",
  "Cybersécurité",
  "Réseaux & Télécoms",
  "Data & IA",
  "Cloud & DevOps",
];

const TYPES_CONTRAT = ["CDI", "CDD", "Alternance", "Stage", "Freelance"];

const buildFormData = (initialValues) => ({
  titre: initialValues?.titre ?? "",
  entreprise: initialValues?.entreprise ?? "",
  domaine: initialValues?.domaine ?? "Développement",
  localisation: initialValues?.localisation ?? "",
  typeContrat: initialValues?.typeContrat ?? "CDI",
  salaire: initialValues?.salaire ?? "",
  description: initialValues?.description ?? "",
  competences: Array.isArray(initialValues?.competences)
    ? initialValues.competences.join(", ")
    : (initialValues?.competences ?? ""),
  disponible: initialValues?.disponible ?? true,
});

/**
 * Formulaire réutilisable pour créer ou modifier une offre d'emploi.
 */
export default function JobForm({
  title,
  submitLabel,
  loadingLabel,
  successMessage,
  initialValues = null,
  onSubmit,
}) {
  const navigate = useNavigate();
  const redirectTimeoutRef = useRef(null);

  const [formData, setFormData] = useState(() => buildFormData(initialValues));
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  // Conserve une valeur existante (ex. "CDD (12 mois)") même si absente de la liste par défaut
  const domaineOptions = DOMAINES.includes(formData.domaine)
    ? DOMAINES
    : [formData.domaine, ...DOMAINES];

  const contratOptions = TYPES_CONTRAT.includes(formData.typeContrat)
    ? TYPES_CONTRAT
    : [formData.typeContrat, ...TYPES_CONTRAT];

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setStatusMessage("");

    if (
      !formData.titre.trim() ||
      !formData.entreprise.trim() ||
      !formData.localisation.trim() ||
      !formData.description.trim()
    ) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires (*).");
      return;
    }

    try {
      setLoading(true);

      const jobPayload = {
        titre: formData.titre.trim(),
        entreprise: formData.entreprise.trim(),
        domaine: formData.domaine,
        localisation: formData.localisation.trim(),
        typeContrat: formData.typeContrat,
        salaire: formData.salaire.trim() || "Non communiqué",
        description: formData.description.trim(),
        competences: formData.competences
          ? formData.competences
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean)
          : [],
        disponible: Boolean(formData.disponible),
      };

      await onSubmit(jobPayload);

      setStatusMessage(successMessage);
      redirectTimeoutRef.current = setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error(error);
      setErrorMessage("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const isLocked = loading || Boolean(statusMessage);

  return (
    <div className="container py-4">
      <div
        className="form-card card border-0 rounded-4 overflow-hidden mx-auto"
        style={{ maxWidth: "700px" }}
      >
        {/* En-tête coloré */}
        <header className="hero text-center py-4 px-3">
          <span className="blob blob-1" />
          <span className="blob blob-2" />
          <h2 className="h3 fw-bold mb-0">{title}</h2>
        </header>

        <div className="card-body p-4 p-md-5">
          {errorMessage && (
            <div className="alert alert-danger rounded-4">
              ⚠️ {errorMessage}
            </div>
          )}
          {statusMessage && (
            <div className="alert alert-success rounded-4">
              ✅ {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="titre" className="form-label">
                Titre de l&apos;offre *
              </label>
              <input
                type="text"
                id="titre"
                name="titre"
                className="form-control"
                value={formData.titre}
                onChange={handleChange}
                placeholder="ex: Développeur Full Stack React"
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="entreprise" className="form-label">
                  Entreprise *
                </label>
                <input
                  type="text"
                  id="entreprise"
                  name="entreprise"
                  className="form-control"
                  value={formData.entreprise}
                  onChange={handleChange}
                  placeholder="ex: TechSolutions"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="localisation" className="form-label">
                  Localisation *
                </label>
                <input
                  type="text"
                  id="localisation"
                  name="localisation"
                  className="form-control"
                  value={formData.localisation}
                  onChange={handleChange}
                  placeholder="ex: Bordeaux (Hybride)"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="domaine" className="form-label">
                  Domaine *
                </label>
                <select
                  id="domaine"
                  name="domaine"
                  className="form-select"
                  value={formData.domaine}
                  onChange={handleChange}
                >
                  {domaineOptions.map((domaine) => (
                    <option key={domaine} value={domaine}>
                      {domaine}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="typeContrat" className="form-label">
                  Type de contrat
                </label>
                <select
                  id="typeContrat"
                  name="typeContrat"
                  className="form-select"
                  value={formData.typeContrat}
                  onChange={handleChange}
                >
                  {contratOptions.map((contrat) => (
                    <option key={contrat} value={contrat}>
                      {contrat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="salaire" className="form-label">
                Salaire indicatif
              </label>
              <input
                type="text"
                id="salaire"
                name="salaire"
                className="form-control"
                value={formData.salaire}
                onChange={handleChange}
                placeholder="ex: 40k€ - 45k€"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="competences" className="form-label">
                Compétences requises (séparées par une virgule)
              </label>
              <input
                type="text"
                id="competences"
                name="competences"
                className="form-control"
                value={formData.competences}
                onChange={handleChange}
                placeholder="React, Vite, Node.js, Git"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description de l&apos;offre *
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                placeholder="Détaillez les missions et le profil recherché..."
                required
              ></textarea>
            </div>

            <div className="form-check form-switch mb-4">
              <input
                type="checkbox"
                id="disponible"
                name="disponible"
                className="form-check-input"
                checked={formData.disponible}
                onChange={handleChange}
              />
              <label
                htmlFor="disponible"
                className="form-check-label fw-semibold"
              >
                Offre disponible
              </label>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={() => navigate("/")}
                disabled={loading}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-grad rounded-pill px-4 py-2"
                disabled={isLocked}
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  />
                )}
                {loading ? loadingLabel : submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
