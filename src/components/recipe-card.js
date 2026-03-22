// components/recipe-card.js
// Custom element : recipe-card

class RecipeCard extends HTMLElement {
  connectedCallback() {
    const recipe = this.recipe;
    if (!recipe) return;

    this.innerHTML = `
      <img class="recipe-preview" src="${recipe.preview_url}" alt="${recipe.name}" />
      <div class="recipe-info">
        <span class="recipe-name">${recipe.name}</span>
      </div>
    `;
  }
}

customElements.define("recipe-card", RecipeCard);
