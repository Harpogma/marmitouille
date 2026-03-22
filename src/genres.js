// src/genres.js
// Logique d'affichage de la liste des genres + custom element genre-card

import { fetchGenres } from "./api.js";
import { isGenreLiked, toggleLikeGenre } from "./lib/local-storage.js";

// ─── Custom Element : genre-card ─────────────────────────────────────────────

class GenreCard extends HTMLElement {
  connectedCallback() {
    const genre = this.genre;
    if (!genre) return;

    this.innerHTML = `
      <img class="genre-thumbnail" src="${genre.thumbnail_url}" alt="${genre.title}" />
      <div class="genre-info">
        <span class="genre-title">${genre.title}</span>
        <span class="genre-count">${genre.count} recette${genre.count > 1 ? "s" : ""}</span>
      </div>
      <button class="btn-like" aria-label="Aimer ce genre">
        <span class="icon">${isGenreLiked(genre.id) ? "❤️" : "🤍"}</span>
      </button>
    `;

    const icon = this.querySelector(".icon");
    const btnLike = this.querySelector(".btn-like");

    this.addEventListener("click", (e) => {
      if (!e.target.closest(".btn-like")) {
        window.location.hash = `#genres-${genre.id}`;
      }
    });

    btnLike.addEventListener("click", (e) => {
      e.stopPropagation();
      const liked = toggleLikeGenre(genre);
      icon.textContent = liked ? "❤️" : "🤍";
    });
  }
}

customElements.define("genre-card", GenreCard);

// ─── Affichage de la liste ────────────────────────────────────────────────────

/**
 * Affiche la liste de tous les genres dans #section-genres
 */
export async function displayGenres() {
  const section = document.getElementById("section-genres");
  const titleEl = section.querySelector(".section-title");
  const list = section.querySelector(".genres");

  list.innerHTML = "";

  try {
    const genres = await fetchGenres();

    titleEl.textContent = `Genres de recettes (${genres.length})`;

    genres.forEach((genre) => {
      const li = document.createElement("li");
      const card = document.createElement("genre-card");
      card.genre = genre;
      li.appendChild(card);
      list.appendChild(li);
    });
  } catch (err) {
    list.innerHTML = `<p style="color:red">Erreur : ${err.message}</p>`;
  }
}
