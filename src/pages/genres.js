// pages/genres.js
// Logique d'affichage de la liste des genres

import { fetchGenres } from "../api.js";
import "../components/genre-card.js";

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
