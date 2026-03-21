# B. PARTIE THÉORIQUE — Réponses

---

## 1. flex-grow / flex-shrink

**flex-grow** et **flex-shrink** contrôlent comment les éléments flex se répartissent l'espace
libre (ou manquant) dans leur conteneur flex.

### Logique de calcul

**Espace libre total** = taille du conteneur − somme des tailles de base des items (flex-basis / width).

#### flex-grow (distribution de l'espace en surplus)

Si les items ne remplissent pas tout le conteneur, l'espace restant est distribué
*proportionnellement* aux valeurs de `flex-grow` :

```
part d'un item = (flex-grow de cet item / somme de tous les flex-grow) × espace libre
```

Exemple : conteneur 600px, deux items de 100px chacun (200px en tout).
- Item A : flex-grow 1, Item B : flex-grow 2
- Espace libre = 400px
- Item A reçoit 400 × (1/3) ≈ 133px → taille finale 233px
- Item B reçoit 400 × (2/3) ≈ 267px → taille finale 367px

#### flex-shrink (réduction en cas de débordement)

Si les items débordent du conteneur, le dépassement est absorbé *proportionnellement*
aux valeurs de `flex-shrink` **pondérées par la taille de base** de chaque item :

```
poids d'un item = flex-shrink × flex-basis
réduction d'un item = dépassement × (poids de cet item / somme de tous les poids)
```

Ce pondérage évite de réduire de façon disproportionnée un item déjà petit.

---

## 2. Avantages des custom events — utilisation dans le projet

Les **custom events** (`new CustomEvent('nom', { detail: ... })`) permettent de faire
communiquer des composants sans qu'ils se connaissent directement (couplage faible).

### Avantages
- **Découplage** : l'émetteur ne connaît pas les consommateurs ; on peut ajouter ou
  retirer des listeners sans toucher à l'émetteur.
- **Communication parent → enfant impossible ou difficile** : un custom element peut
  notifier son parent ou n'importe quel ancêtre via `bubbles: true`.
- **Réutilisabilité** : le composant peut être utilisé dans n'importe quel contexte ;
  il suffit d'écouter l'événement.
- **Sémantique claire** : l'événement porte un nom métier (`genre-liked`, `recipe-selected`)
  qui documente l'intention.

### Dans notre projet
On les utiliserait par exemple pour que le `genre-card` notifie l'application principale
qu'un like a été ajouté/retiré, sans que la carte n'ait besoin d'importer elle-même
la logique de localStorage ou de mettre à jour d'autres vues.

---

## 3. Shadow DOM

Le **shadow DOM** est un sous-arbre DOM encapsulé, attaché à un élément hôte, dont
les styles et la structure sont **isolés** du document principal.

```js
const shadow = element.attachShadow({ mode: 'open' });
shadow.innerHTML = `<style>p { color: red; }</style><p>Texte isolé</p>`;
```

- Les styles définis à l'intérieur ne fuient pas vers l'extérieur, et ceux de l'extérieur
  n'entrent pas (sauf via les CSS custom properties).
- Les sélecteurs `document.querySelector` ne traversent pas la shadow boundary.

### Exemple concret
Les éléments natifs `<video>`, `<input type="range">` ou `<details>` utilisent le
shadow DOM pour afficher leurs contrôles internes.

### Comparaison avec notre projet
Dans notre application, les **custom elements** (`genre-card`, `recipe-card`) sont
comparables : ils encapsulent leur markup et leur logique interne. La différence est
qu'on n'utilise pas de shadow DOM ici (pas de `attachShadow`), donc nos styles
globaux s'appliquent quand même aux enfants. Avec shadow DOM, l'isolation serait totale.

---

## 4. Désavantages du caching "cache then network" (stale-while-revalidate)

La stratégie décrite consiste à **servir la version en cache si elle existe, sinon
laisser passer la requête, la stocker, puis la servir**.

### Désavantages

1. **Contenu périmé (stale content)** : tant que la ressource est en cache, l'utilisateur
   reçoit l'ancienne version, même si le serveur dispose d'une mise à jour. L'actualisation
   n'arrive qu'à la *prochaine* requête (après que le cache a été rafraîchi).

2. **Pas de stratégie d'invalidation** : sans mécanisme d'expiration (`Cache-Control`,
   versionnage d'URL), le contenu mis en cache peut rester indéfiniment, même s'il
   est devenu incorrect.

3. **Problèmes avec les API dynamiques** : pour des données qui changent fréquemment
   (liste de recettes mise à jour par le serveur), l'utilisateur peut afficher des
   données obsolètes longtemps après leur modification côté serveur.

4. **Croissance incontrôlée du cache** : sans politique de nettoyage, le cache peut
   grossir sans limite, consommant de l'espace disque sur l'appareil de l'utilisateur.

5. **Opacité pour le développeur** : débogage plus complexe car le comportement dépend
   de l'état du cache, difficile à reproduire de façon déterministe.
