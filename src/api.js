// src/api.js
// Point d'entrée du serveur backend
export const API_BASE = '/api';

/**
 * Récupère tous les genres de recettes
 * @returns {Promise<Array>} tableau de genres
 */
export async function fetchGenres() {
  const res = await fetch(`${API_BASE}/genres`);
  if (!res.ok) throw new Error('Erreur lors du chargement des genres');
  return res.json();
}

/**
 * Récupère un genre par son id
 * @param {string} id
 * @returns {Promise<Object>} genre
 */
export async function fetchGenre(id) {
  const res = await fetch(`${API_BASE}/genres/${id}`);
  if (!res.ok) throw new Error('Genre non trouvé');
  return res.json();
}

/**
 * Récupère les recettes d'un genre
 * @param {string} genreId
 * @returns {Promise<Array>} tableau de recettes
 */
export async function fetchRecipesByGenre(genreId) {
  const res = await fetch(`${API_BASE}/genres/${genreId}/recipes`);
  if (!res.ok) throw new Error('Erreur lors du chargement des recettes');
  return res.json();
}

/**
 * Récupère toutes les recettes (pour l'inspiration)
 * @returns {Promise<Array>} tableau de toutes les recettes
 */
export async function fetchAllRecipes() {
  const res = await fetch(`${API_BASE}/recipes`);
  if (!res.ok) throw new Error('Erreur lors du chargement des recettes');
  return res.json();
}
