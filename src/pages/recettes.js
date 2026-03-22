// pages/recettes.js
// Logique d'affichage des recettes d'un genre

import { fetchGenre, fetchRecipesByGenre } from "../api.js";
import "../components/recipe-card.js";

/**
 * Affiche les recettes d'un genre dans #section-recettes
 * @param {string} genreId
 */
export async function displayRecettes(genreId) {
  const section = document.getElementById("section-recettes");
  const titleEl = section.querySelector(".section-title");
  const list = section.querySelector(".recettes");

  list.innerHTML = "";
  titleEl.textContent = "Chargement…";

  try {
    const [genre, recettes] = await Promise.all([
      fetchGenre(genreId),
      fetchRecipesByGenre(genreId),
    ]);

    titleEl.textContent = `Genres de recettes > ${genre.title} (${recettes.length})`;

    recettes.forEach((recipe) => {
      const li = document.createElement("li");
      const card = document.createElement("recipe-card");
      card.recipe = recipe;
      li.appendChild(card);
      list.appendChild(li);
    });
  } catch (err) {
    titleEl.textContent = "Erreur";
    list.innerHTML = `<p style="color:red">Erreur : ${err.message}</p>`;
  }
}
