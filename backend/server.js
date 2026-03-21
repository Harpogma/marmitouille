/**
 * Marmitouille - Backend API Server
 * Run: node server.js (port 3001)
 */

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 1337;

app.use(cors());
app.use(express.json());

// ─── DATA ────────────────────────────────────────────────────────────────────

const genres = [
  { id: '1', title: 'Italiennes', count: 12, thumbnail_url: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400' },
  { id: '2', title: 'Asiatiques', count: 18, thumbnail_url: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400' },
  { id: '3', title: 'Françaises', count: 9,  thumbnail_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400' },
  { id: '4', title: 'Mexicaines', count: 7,  thumbnail_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400' },
  { id: '5', title: 'Indiennes',  count: 11, thumbnail_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400' },
  { id: '6', title: 'Américaines',count: 8,  thumbnail_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400' },
  { id: '7', title: 'Japonaises', count: 14, thumbnail_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400' },
  { id: '8', title: 'Méditerranéennes', count: 6, thumbnail_url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400' },
];

const recipes = {
  '1': [ // Italiennes
    { id: 'r101', name: 'Spaghetti Carbonara', preview_url: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400', steps: '<ol><li>Faire cuire les pâtes <strong>al dente</strong> dans de l\'eau salée.</li><li>Faire revenir les lardons dans une poêle.</li><li>Mélanger les œufs et le parmesan râpé.</li><li>Hors du feu, mélanger pâtes, lardons et appareil œuf/parmesan.</li><li>Poivrer généreusement et servir immédiatement.</li></ol>' },
    { id: 'r102', name: 'Pizza Margherita', preview_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400', steps: '<ol><li>Préparer la pâte à pizza et la laisser lever <em>1h</em>.</li><li>Étaler la pâte et napper de sauce tomate.</li><li>Ajouter la mozzarella en tranches.</li><li>Cuire au four à 250°C pendant 10-12 min.</li><li>Garnir de basilic frais avant de servir.</li></ol>' },
    { id: 'r103', name: 'Risotto aux champignons', preview_url: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400', steps: '<ol><li>Faire revenir l\'oignon et l\'ail dans du beurre.</li><li>Ajouter le riz arborio et nacrer 2 min.</li><li>Déglacer au vin blanc.</li><li>Ajouter le bouillon chaud louche par louche.</li><li>Incorporer les champignons poêlés et le parmesan.</li></ol>' },
  ],
  '2': [ // Asiatiques
    { id: 'r201', name: 'Pad Thaï', preview_url: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400', steps: '<ol><li>Faire tremper les nouilles de riz dans l\'eau froide.</li><li>Faire sauter les crevettes et le tofu dans un wok.</li><li>Ajouter les nouilles égouttées.</li><li>Incorporer la sauce (tamarin, nuoc-mam, sucre).</li><li>Servir avec cacahuètes concassées et citron vert.</li></ol>' },
    { id: 'r202', name: 'Ramen maison', preview_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', steps: '<ol><li>Préparer un bouillon de porc pendant <strong>4h</strong>.</li><li>Cuire les œufs mollets 6 min 30.</li><li>Mariner l\'œuf dans la sauce soja.</li><li>Cuire les nouilles et les plonger dans le bouillon.</li><li>Garnir de chashu, œuf, nori et oignons verts.</li></ol>' },
    { id: 'r203', name: 'Gyozas', preview_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400', steps: '<ol><li>Mélanger porc haché, chou, gingembre, sauce soja.</li><li>Farcir les disques de pâte et plier en demi-lune.</li><li>Dorer les gyozas dans une poêle huilée.</li><li>Ajouter un fond d\'eau et couvrir pour cuire à la vapeur.</li><li>Servir avec sauce ponzu.</li></ol>' },
  ],
  '3': [ // Françaises
    { id: 'r301', name: 'Bœuf Bourguignon', preview_url: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400', steps: '<ol><li>Faire mariner le bœuf dans le vin rouge toute la nuit.</li><li>Faire revenir la viande et les légumes.</li><li>Mouiller avec la marinade et le bouillon.</li><li>Mijoter <em>3 heures</em> à feu doux.</li><li>Servir avec des pommes de terre vapeur.</li></ol>' },
    { id: 'r302', name: 'Soupe à l\'oignon', preview_url: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=400', steps: '<ol><li>Caraméliser les oignons pendant 45 min.</li><li>Déglacer au cognac puis au vin blanc.</li><li>Mouiller au bouillon et cuire 20 min.</li><li>Verser dans des bols, poser des croûtons.</li><li>Gratiner avec du gruyère râpé sous le grill.</li></ol>' },
  ],
  '4': [ // Mexicaines
    { id: 'r401', name: 'Tacos al Pastor', preview_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400', steps: '<ol><li>Mariner le porc avec chili, ananas, cumin, origan.</li><li>Griller la viande marinée au four ou à la poêle.</li><li>Chauffer les tortillas de maïs.</li><li>Garnir de viande, oignon, coriandre, ananas.</li><li>Arroser de sauce verte et de citron vert.</li></ol>' },
    { id: 'r402', name: 'Guacamole', preview_url: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=400', steps: '<ol><li>Écraser les avocats mûrs à la fourchette.</li><li>Ajouter oignon rouge, tomate, coriandre hachés.</li><li>Assaisonner de sel, citron vert, piment jalapeño.</li><li>Mélanger délicatement pour garder de la texture.</li><li>Servir immédiatement avec chips de tortilla.</li></ol>' },
  ],
  '5': [ // Indiennes
    { id: 'r501', name: 'Butter Chicken', preview_url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400', steps: '<ol><li>Mariner le poulet dans du yaourt et les épices.</li><li>Griller le poulet au four à 220°C.</li><li>Préparer la sauce : tomate, beurre, crème, épices.</li><li>Ajouter le poulet grillé dans la sauce.</li><li>Mijoter 15 min et servir avec du riz basmati.</li></ol>' },
    { id: 'r502', name: 'Dal Makhani', preview_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', steps: '<ol><li>Faire tremper les lentilles noires toute la nuit.</li><li>Cuire les lentilles pendant 1h.</li><li>Préparer le tadka avec oignon, tomate, épices.</li><li>Mélanger avec les lentilles cuites.</li><li>Finir avec beurre, crème et feuilles de méthi.</li></ol>' },
  ],
  '6': [ // Américaines
    { id: 'r601', name: 'Cheeseburger maison', preview_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', steps: '<ol><li>Façonner les steaks de bœuf haché à 80% de matières grasses.</li><li>Saler et cuire à feu vif 3 min de chaque côté.</li><li>Ajouter le cheddar et couvrir pour le faire fondre.</li><li>Griller le pain brioché légèrement beurré.</li><li>Assembler avec salade, tomate, cornichons et sauce.</li></ol>' },
    { id: 'r602', name: 'Mac and Cheese', preview_url: 'https://images.unsplash.com/photo-1548940740-204726a19be3?w=400', steps: '<ol><li>Cuire les pâtes macaroni al dente.</li><li>Préparer une béchamel épaisse.</li><li>Incorporer cheddar et gruyère râpés hors du feu.</li><li>Mélanger avec les pâtes égouttées.</li><li>Gratiner au four 15 min avec chapelure.</li></ol>' },
  ],
  '7': [ // Japonaises
    { id: 'r701', name: 'Sushi Maki', preview_url: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400', steps: '<ol><li>Préparer le riz à sushi assaisonné de vinaigre.</li><li>Placer une feuille de nori sur la natte en bambou.</li><li>Étaler le riz sur le nori (laisser 1cm en haut).</li><li>Déposer les garnitures en ligne au bas.</li><li>Rouler fermement et couper en 8 morceaux.</li></ol>' },
    { id: 'r702', name: 'Tempura de légumes', preview_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', steps: '<ol><li>Préparer la pâte à tempura avec eau glacée et farine.</li><li>Ne pas trop mélanger - des grumeaux sont normaux.</li><li>Enrober les légumes de pâte légèrement.</li><li>Frire dans l\'huile à 180°C pendant 2-3 min.</li><li>Égoutter et servir avec sauce tentsuyu.</li></ol>' },
  ],
  '8': [ // Méditerranéennes
    { id: 'r801', name: 'Moussaka', preview_url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400', steps: '<ol><li>Faire dégorger et frire les tranches d\'aubergine.</li><li>Préparer la viande hachée avec sauce tomate épicée.</li><li>Préparer la béchamel avec noix de muscade.</li><li>Alterner couches d\'aubergines et de viande.</li><li>Napper de béchamel et cuire 45 min à 180°C.</li></ol>' },
    { id: 'r802', name: 'Houmous maison', preview_url: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=400', steps: '<ol><li>Mixer les pois chiches cuits avec leur eau de cuisson.</li><li>Ajouter tahini, ail, citron, cumin et sel.</li><li>Mixer jusqu\'à obtenir une consistance crémeuse.</li><li>Ajuster la consistance avec l\'eau des pois chiches.</li><li>Servir avec huile d\'olive et paprika.</li></ol>' },
  ],
};

// Flatten all recipes for /api/recipes
const allRecipes = Object.values(recipes).flat();

// ─── ROUTES ──────────────────────────────────────────────────────────────────

// GET /api/genres
app.get('/api/genres', (req, res) => {
  res.json(genres);
});

// GET /api/genres/:id
app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === req.params.id);
  if (!genre) return res.status(404).json({ error: 'Genre non trouvé' });
  res.json(genre);
});

// GET /api/genres/:id/recipes
app.get('/api/genres/:id/recipes', (req, res) => {
  const genre = genres.find(g => g.id === req.params.id);
  if (!genre) return res.status(404).json({ error: 'Genre non trouvé' });
  const genreRecipes = recipes[req.params.id] || [];
  res.json(genreRecipes);
});

// GET /api/recipes
app.get('/api/recipes', (req, res) => {
  res.json(allRecipes);
});

// GET /api/recipes/:id
app.get('/api/recipes/:id', (req, res) => {
  const recipe = allRecipes.find(r => r.id === req.params.id);
  if (!recipe) return res.status(404).json({ error: 'Recette non trouvée' });
  res.json(recipe);
});

app.listen(PORT, () => {
  console.log(`✅  Marmitouille API running at http://localhost:${PORT}`);
  console.log(`   GET /api/genres`);
  console.log(`   GET /api/genres/:id`);
  console.log(`   GET /api/genres/:id/recipes`);
  console.log(`   GET /api/recipes`);
  console.log(`   GET /api/recipes/:id`);
});
