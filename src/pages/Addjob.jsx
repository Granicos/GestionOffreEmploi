// src/components/AddJob.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { addJob } from "../services/jobService";

export default function AddJob() {
    const navigate = useNavigate();

    // 1. État unique pour stocker les champs du formulaire
    const [formData, setFormData] = useState({
        titre: "",
        entreprise: "",
        domaine: "Développement",
        localisation: "",
        typeContrat: "CDI",
        salaire: "",
        description: "",
        competences: "",
    });

    // 2. États pour le chargement, le succès et les erreurs
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Gestion des changements dans les inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 3. Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        // Validation des champs obligatoires demandée par le sujet
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

            // Préparation de l'objet à envoyer à l'API
            const newJob = {
                titre: formData.titre.trim(),
                entreprise: formData.entreprise.trim(),
                domaine: formData.domaine,
                localisation: formData.localisation.trim(),
                typeContrat: formData.typeContrat,
                salaire: formData.salaire.trim() || "Non communiqué",
                description: formData.description.trim(),
                // Découpe les compétences séparées par des virgules en tableau
                competences: formData.competences
                    ? formData.competences.split(",").map((c) => c.trim()).filter(Boolean)
                    : [],
                datePublication: new Date().toISOString().split("T")[0],
                disponible: true,
            };

            // Appel de la fonction de service API
            await addJob(newJob);

            // Message de succès demandé dans le sujet
            setSuccessMessage("Offre ajoutée");

            // Redirection après 1.5 seconde vers la page d'accueil ou la liste
            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (error) {
            console.error(error);
            // Message d'erreur demandé dans le sujet
            setErrorMessage("Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4 mb-5">
            <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "700px" }}>
                <h2 className="mb-4 text-center">Ajouter une offre d'emploi</h2>

                {/* Affichage des messages de statut */}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <form onSubmit={handleSubmit}>
                    {/* Titre */}
                    <div className="mb-3">
                        <label htmlFor="titre" className="form-label">
                            Titre de l'offre *
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
                        {/* Entreprise */}
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

                        {/* Localisation */}
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
                        {/* Domaine / Catégorie */}
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
                                <option value="Développement">Développement</option>
                                <option value="Cybersécurité">Cybersécurité</option>
                                <option value="Réseaux & Télécoms">Réseaux & Télécoms</option>
                                <option value="Data & IA">Data & IA</option>
                                <option value="Cloud & DevOps">Cloud & DevOps</option>
                            </select>
                        </div>

                        {/* Type de contrat */}
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
                                <option value="CDI">CDI</option>
                                <option value="CDD">CDD</option>
                                <option value="Alternance">Alternance</option>
                                <option value="Stage">Stage</option>
                                <option value="Freelance">Freelance</option>
                            </select>
                        </div>
                    </div>

                    {/* Salaire */}
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

                    {/* Compétences */}
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

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="form-label">
                            Description de l'offre *
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

                    {/* Boutons d'action */}
                    <div className="d-flex justify-content-between">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/")}
                            disabled={loading}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Ajout en cours..." : "Publier l'offre"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}