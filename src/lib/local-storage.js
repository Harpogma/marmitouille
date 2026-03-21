// src/lib/local-storage.js
// Fonctions utilitaires pour la gestion des genres "likés" en localStorage

const LIKED_KEY = 'marmitouille_liked_genres';

/**
 * Récupère la liste des genres likés
 * @returns {Array} tableau d'objets genre
 */
export function getLikedGenres() {
  const raw = localStorage.getItem(LIKED_KEY);
  return raw ? JSON.parse(raw) : [];
}

/**
 * Vérifie si un genre est liké
 * @param {string} genreId
 * @returns {boolean}
 */
export function isGenreLiked(genreId) {
  return getLikedGenres().some(g => g.id === genreId);
}

/**
 * Ajoute un genre aux likés
 * @param {Object} genre - objet genre complet
 */
export function likeGenre(genre) {
  const liked = getLikedGenres();
  if (!liked.some(g => g.id === genre.id)) {
    liked.push(genre);
    localStorage.setItem(LIKED_KEY, JSON.stringify(liked));
  }
}

/**
 * Retire un genre des likés
 * @param {string} genreId
 */
export function unlikeGenre(genreId) {
  const liked = getLikedGenres().filter(g => g.id !== genreId);
  localStorage.setItem(LIKED_KEY, JSON.stringify(liked));
}

/**
 * Toggle like d'un genre
 * @param {Object} genre - objet genre complet
 * @returns {boolean} - true si liké après l'opération, false sinon
 */
export function toggleLikeGenre(genre) {
  if (isGenreLiked(genre.id)) {
    unlikeGenre(genre.id);
    return false;
  } else {
    likeGenre(genre);
    return true;
  }
}
