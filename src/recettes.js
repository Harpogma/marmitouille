// src/recettes.js
// Logique d'affichage des recettes d'un genre + custom element recipe-card

import { fetchGenre, fetchRecipesByGenre } from './api.js';

// ─── Custom Element : recipe-card ────────────────────────────────────────────

class RecipeCard extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <img class="recipe-preview" src="" alt="" />
      <div class="recipe-info">
        <span class="recipe-name"></span>
      </div>
    `;
  }

  /**
   * Hydrate le composant avec un objet recette
   * @param {Object} recipe
   */
  setRecipe(recipe) {
    const img  = this.querySelector('.recipe-preview');
    const name = this.querySelector('.recipe-name');

    img.src  = recipe.preview_url;
    img.alt  = recipe.name;
    name.textContent = recipe.name;
  }
}

customElements.define('recipe-card', RecipeCard);

// ─── Affichage des recettes d'un genre ───────────────────────────────────────

/**
 * Affiche les recettes d'un genre dans #section-recettes
 * @param {string} genreId
 */
export async function displayRecettes(genreId) {
  const section = document.getElementById('section-recettes');
  const titleEl = section.querySelector('.section-title');
  const list    = section.querySelector('.recettes');

  list.innerHTML = '';
  titleEl.textContent = 'Chargement…';

  try {
    // On récupère le genre (pour son nom) et ses recettes en parallèle
    const [genre, recettes] = await Promise.all([
      fetchGenre(genreId),
      fetchRecipesByGenre(genreId),
    ]);

    titleEl.textContent =
      `Genres de recettes > ${genre.title} (${recettes.length})`;

    recettes.forEach(recipe => {
      const li   = document.createElement('li');
      const card = document.createElement('recipe-card');
      card.setRecipe(recipe);
      li.appendChild(card);
      list.appendChild(li);
    });

  } catch (err) {
    titleEl.textContent = 'Erreur';
    list.innerHTML = `<p style="color:red">Erreur : ${err.message}</p>`;
  }
}
