# 🍲 Marmitouille — Guide de démarrage

## Structure du projet

```
marmitouille/
├── index.html                   # HTML principal avec toutes les sections
├── package.json                 # Dépendances Vite
├── vite.config.js               # Config Vite (proxy /api → localhost:3001)
├── public/
│   ├── manifest.webmanifest     # Manifest PWA
│   └── worker.js                # Service Worker
├── src/
│   ├── style.css                # Styles globaux
│   ├── index.js                 # Routeur hashchange + init SW
│   ├── api.js                   # Fonctions fetch vers le backend
│   ├── genres.js                # Custom element genre-card + affichage genres
│   ├── recettes.js              # Custom element recipe-card + affichage recettes
│   ├── inspiration.js           # Navigation entre recettes
│   ├── liked.js                 # Affichage des genres likés
│   └── lib/
│       └── local-storage.js     # Helpers localStorage (like/unlike/toggle)
├── backend/
│   ├── server.js                # Serveur Express avec toutes les données
│   └── package.json
└── REPONSES_THEORIQUES.md       # Réponses partie B
```

## Lancer le projet

### 1. Backend (API)
```bash
cd backend
npm install
node server.js
# → http://localhost:3001
```

### Endpoints disponibles
| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/genres` | Liste tous les genres |
| GET | `/api/genres/:id` | Un genre par id |
| GET | `/api/genres/:id/recipes` | Recettes d'un genre |
| GET | `/api/recipes` | Toutes les recettes |
| GET | `/api/recipes/:id` | Une recette par id |

### 2. Frontend (Vite)
```bash
# À la racine du projet
npm install
npm run start
# → http://localhost:5173
```

> Le proxy Vite redirige automatiquement `/api/*` → `http://localhost:3001`

## Avant de démarrer (comme indiqué dans l'énoncé)
1. Vider le localStorage : `localStorage.clear()` dans la console
2. Supprimer les service workers dans les DevTools (Application → Service Workers)

## Navigation
| Hash | Vue |
|------|-----|
| `#genres` | Liste de tous les genres |
| `#genres-[id]` | Recettes d'un genre |
| `#inspiration` | Inspiration (navigation entre recettes) |
| `#liked` | Genres likés |
