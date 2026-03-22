// pages/inspiration.js
// Logique de la section inspiration : navigation entre toutes les recettes

import { fetchAllRecipes } from '../api.js';

let recipes   = [];
let currentIndex = 0;

/**
 * Met à jour l'affichage avec la recette courante
 */
function renderCurrentRecipe() {
  const section  = document.getElementById('section-inspiration');
  const img      = section.querySelector('.inspiration-preview');
  const nameEl   = section.querySelector('.inspiration-name');
  const stepsEl  = section.querySelector('.inspiration-steps');
  const counter  = section.querySelector('.inspiration-counter');
  const btnPrev  = document.getElementById('btn-prev');
  const btnNext  = document.getElementById('btn-next');

  const recipe = recipes[currentIndex];
  if (!recipe) return;

  img.src       = recipe.preview_url;
  img.alt       = recipe.name;
  nameEl.textContent = recipe.name;
  stepsEl.innerHTML  = recipe.steps; // HTML autorisé (cf. énoncé)

  counter.textContent = `${currentIndex + 1} / ${recipes.length}`;

  btnPrev.disabled = currentIndex === 0;
  btnNext.disabled = currentIndex === recipes.length - 1;
}

/**
 * Initialise la section inspiration (chargement + listeners)
 * Appelé à chaque fois que le hash #inspiration est activé
 */
export async function displayInspiration() {
  const section = document.getElementById('section-inspiration');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  // Éviter de re-binder les listeners à chaque visite
  if (!section.dataset.initialized) {
    btnPrev.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        renderCurrentRecipe();
      }
    });

    btnNext.addEventListener('click', () => {
      if (currentIndex < recipes.length - 1) {
        currentIndex++;
        renderCurrentRecipe();
      }
    });

    section.dataset.initialized = 'true';
  }

  // Toujours (re)charger les recettes et réinitialiser l'index
  try {
    recipes = await fetchAllRecipes();
    currentIndex = 0;
    renderCurrentRecipe();
  } catch (err) {
    section.querySelector('.inspiration-name').textContent = 'Erreur de chargement';
    section.querySelector('.inspiration-steps').textContent = err.message;
  }
}
