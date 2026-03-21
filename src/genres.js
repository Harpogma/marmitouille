// src/genres.js
// Logique d'affichage de la liste des genres + custom element genre-card

import { fetchGenres } from './api.js';
import { isGenreLiked, toggleLikeGenre } from './lib/local-storage.js';

// ─── Custom Element : genre-card ─────────────────────────────────────────────

class GenreCard extends HTMLElement {
  constructor() {
    super();
    // Structure interne
    this.innerHTML = `
      <img class="genre-thumbnail" src="" alt="" />
      <div class="genre-info">
        <span class="genre-title"></span>
        <span class="genre-count"></span>
      </div>
      <button class="btn-like" aria-label="Aimer ce genre">
        <span class="icon"></span>
      </button>
    `;
  }

  /**
   * Hydrate le composant avec un objet genre
   * @param {Object} genre
   */
  setGenre(genre) {
    this._genre = genre;

    const img    = this.querySelector('.genre-thumbnail');
    const title  = this.querySelector('.genre-title');
    const count  = this.querySelector('.genre-count');
    const icon   = this.querySelector('.icon');
    const btnLike = this.querySelector('.btn-like');

    img.src    = genre.thumbnail_url;
    img.alt    = genre.title;
    title.textContent = genre.title;
    count.textContent = `${genre.count} recette${genre.count > 1 ? 's' : ''}`;
    icon.textContent  = isGenreLiked(genre.id) ? '❤️' : '🤍';

    // Clic sur la carte → navigation vers les recettes du genre
    this.addEventListener('click', (e) => {
      if (!e.target.closest('.btn-like')) {
        window.location.hash = `#genres-${genre.id}`;
      }
    });

    // Clic sur le bouton like
    btnLike.addEventListener('click', (e) => {
      e.stopPropagation();
      const liked = toggleLikeGenre(genre);
      icon.textContent = liked ? '❤️' : '🤍';
    });
  }
}

customElements.define('genre-card', GenreCard);

// ─── Affichage de la liste ────────────────────────────────────────────────────

/**
 * Affiche la liste de tous les genres dans #section-genres
 */
export async function displayGenres() {
  const section = document.getElementById('section-genres');
  const titleEl = section.querySelector('.section-title');
  const list    = section.querySelector('.genres');

  list.innerHTML = '';

  try {
    const genres = await fetchGenres();

    titleEl.textContent = `Genres de recettes (${genres.length})`;

    genres.forEach(genre => {
      const li   = document.createElement('li');
      const card = document.createElement('genre-card');
      card.setGenre(genre);
      li.appendChild(card);
      list.appendChild(li);
    });
  } catch (err) {
    list.innerHTML = `<p style="color:red">Erreur : ${err.message}</p>`;
  }
}
