// src/services/jobService.js

const BASE_URL = "http://localhost:3000";
const API_URL = `${BASE_URL}/jobs`;

/**
 * Récupère les offres d'emploi (supporte pagination, filtre par domaine et recherche)
 */
export const getJobs = async (params = {}) => {
  try {
    const query = new URLSearchParams();

    if (params.page) query.append("_page", params.page);
    if (params.limit) query.append("_limit", params.limit);
    if (params.domaine) query.append("domaine", params.domaine);
    if (params.q) query.append("q", params.q);

    const queryString = query.toString();
    const url = queryString ? `${API_URL}?${queryString}` : API_URL;

    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erreur HTTP: " + response.status);
    }

    const totalCount = parseInt(
      response.headers.get("X-Total-Count") || "0",
      10,
    );
    const data = await response.json();

    return {
      data,
      totalCount,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des offres:", error);
    throw error;
  }
};

/**
 * Récupère le détail d'une offre via son ID
 */
export const getJobById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Offre d'emploi introuvable");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération de l'offre:", error);
    throw error;
  }
};

/**
 * Ajoute une nouvelle offre d'emploi
 */
export const addJob = async (job) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });

    if (!response.ok) {
      throw new Error("Erreur HTTP: " + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'offre:", error);
    throw error;
  }
};

/**
 * Met à jour partiellement une offre existante
 */
export const updateJob = async (id, updatedFields) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour de l'offre");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'offre:", error);
    throw error;
  }
};

/**
 * Supprime une offre d'emploi
 */
export const deleteJob = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'offre");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'offre:", error);
    throw error;
  }
};

/**
 * Récupère les catégories d'emploi pour la navigation latérale
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erreur lors du chargement des catégories");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    throw error;
  }
};
