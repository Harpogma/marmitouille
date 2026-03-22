// src/index.js
// Point d'entrée : gestion du hashchange et routage entre les sections

import { displayGenres }      from './pages/genres.js';
import { displayRecettes }    from './pages/recettes.js';
import { displayInspiration } from './pages/inspiration.js';
import { displayLiked }       from './pages/liked.js';

// Map hash → id de section HTML
const SECTIONS = {
  'genres':      'section-genres',
  'recettes':    'section-recettes',
  'inspiration': 'section-inspiration',
  'liked':       'section-liked',
};

/**
 * Cache toutes les sections
 */
function hideAll() {
  Object.values(SECTIONS).forEach(id => {
    document.getElementById(id)?.classList.add('hidden');
  });
}

/**
 * Affiche une section par son id HTML
 * @param {string} sectionId
 */
function showSection(sectionId) {
  hideAll();
  document.getElementById(sectionId)?.classList.remove('hidden');
}

/**
 * Routeur principal basé sur le hash
 */
async function router() {
  // Lire le hash sans le #
  const hash = window.location.hash.replace('#', '') || 'genres';

  if (hash === 'genres') {
    showSection('section-genres');
    await displayGenres();

  } else if (hash.startsWith('genres-')) {
    // #genres-[id]
    const genreId = hash.replace('genres-', '');
    showSection('section-recettes');
    await displayRecettes(genreId);

  } else if (hash === 'inspiration') {
    showSection('section-inspiration');
    await displayInspiration();

  } else if (hash === 'liked') {
    showSection('section-liked');
    displayLiked();

  } else {
    // Fallback : genres
    window.location.hash = '#genres';
  }
}

// ─── Événements ──────────────────────────────────────────────────────────────

window.addEventListener('hashchange', router);

// Appel initial au chargement de la page
router();

// ─── PWA : enregistrement du Service Worker ───────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/worker.js')
      .then(reg => console.log('Service Worker enregistré :', reg.scope))
      .catch(err => console.error('Service Worker échec :', err));
  });
}
