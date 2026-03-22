// components/genre-card.js
// Custom element : genre-card

import { isGenreLiked, toggleLikeGenre } from "../lib/local-storage.js";

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
