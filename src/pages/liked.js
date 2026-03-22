// pages/liked.js
// Affichage et gestion des genres préférés (likés)

import { getLikedGenres, unlikeGenre } from '../lib/local-storage.js';

/**
 * Affiche la liste des genres likés dans #section-liked
 * En cas de suppression en live (dans cette vue), retire l'élément du DOM.
 */
export function displayLiked() {
  const section  = document.getElementById('section-liked');
  const titleEl  = section.querySelector('.section-title');
  const list     = section.querySelector('.liked-list');
  const emptyMsg = section.querySelector('.liked-empty');

  list.innerHTML = '';

  const liked = getLikedGenres();

  titleEl.textContent = `Likes (${liked.length})`;

  if (liked.length === 0) {
    emptyMsg.classList.remove('hidden');
    return;
  }

  emptyMsg.classList.add('hidden');

  liked.forEach(genre => {
    const li = document.createElement('li');
    li.classList.add('liked-item');
    li.dataset.id = genre.id;

    li.innerHTML = `
      <img src="${genre.thumbnail_url}" alt="${genre.title}" />
      <span class="liked-title">${genre.title}</span>
      <span class="liked-count">${genre.count} recette${genre.count > 1 ? 's' : ''}</span>
      <button class="btn-unlike" aria-label="Retirer des likes">❤️</button>
    `;

    // Retrait du like → supprime directement l'item de la vue
    li.querySelector('.btn-unlike').addEventListener('click', () => {
      unlikeGenre(genre.id);
      li.remove();

      // Mettre à jour le compteur et l'état vide
      const remaining = list.querySelectorAll('.liked-item').length;
      titleEl.textContent = `Likes (${remaining})`;
      if (remaining === 0) {
        emptyMsg.classList.remove('hidden');
      }
    });

    list.appendChild(li);
  });
}
