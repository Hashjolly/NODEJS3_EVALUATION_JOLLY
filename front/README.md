# 🪑 Site Vitrine - Gestion de Meubles

Site vitrine moderne développé en Vue.js pour présenter une collection de meubles, matériaux et fournisseurs.

## 🚀 Démarrage rapide

```bash
# Installation des dépendances
npm install

# Lancement en mode développement
npm run dev

# Build pour la production
npm run build
```

## 🌐 Accès

- **Développement**: http://localhost:5173
- **Backend API**: http://localhost:3004

## ✨ Fonctionnalités

- 🏠 **Page d'accueil** avec présentation générale
- 🪑 **Catalogue meubles** avec détails et filtres
- 🔧 **Matériaux** avec spécifications techniques
- 🏭 **Fournisseurs** avec informations de contact
- 📱 **Design responsive** adaptatif mobile/desktop
- 🔍 **Recherche avancée** par catégorie et mots-clés
- ⚡ **Navigation fluide** avec Vue Router

## 🛠 Technologies

- **Vue.js 3** - Framework frontend moderne
- **TypeScript** - Typage statique
- **Vite** - Build tool rapide
- **CSS moderne** - Design responsive
- **Axios** - Client HTTP pour l'API

## 📁 Structure

```
src/
├── components/     # Composants réutilisables
├── views/         # Pages principales
├── services/      # Services API
├── router/        # Configuration routing
└── assets/        # Assets statiques
```

## 🏗️ Architecture Détaillée

```
src/
├── components/              # 🧩 Composants Vue réutilisables
│   ├── Navigation.vue       # 🧭 Navigation principale
│   ├── Footer.vue           # 🦶 Pied de page
│   ├── SearchBar.vue        # 🔍 Barre de recherche
│   └── Card.vue             # 🃏 Carte d'affichage
├── views/                   # 📄 Pages principales du site
│   ├── Home.vue             # 🏠 Page d'accueil
│   ├── Furniture.vue        # 🪑 Catalogue meubles
│   ├── FurnitureDetail.vue  # 🔍 Détail meuble
│   ├── Materials.vue        # 🔧 Liste matériaux
│   ├── MaterialDetail.vue   # 🔍 Détail matériau
│   ├── Suppliers.vue        # 🏭 Liste fournisseurs
│   ├── SupplierDetail.vue   # 🔍 Détail fournisseur
│   ├── About.vue            # ℹ️ À propos
│   └── Contact.vue          # 📞 Contact
├── services/
│   └── api.ts               # 🔌 Client API TypeScript
├── router/
│   └── index.ts             # 🛣️ Configuration Vue Router
├── assets/
│   ├── css/                 # 🎨 Styles CSS
│   └── images/              # 🖼️ Images et assets
└── types/                   # 📝 Types TypeScript
    └── index.ts             # 🔧 Définitions de types
```

## 🎨 Fonctionnalités Avancées

### 🔍 Recherche et Filtrage
- **Recherche textuelle** - Par nom, description, mots-clés
- **Filtres par catégorie** - Meubles, matériaux, fournisseurs
- **Tri dynamique** - Prix, date, popularité
- **Suggestions** - Autocomplétion temps réel

### 📱 Responsive Design
- **Mobile First** - Optimisé pour tous les écrans
- **Breakpoints** - sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly** - Interactions tactiles optimisées
- **Progressive Web App** - Installation possible

### ⚡ Performance
- **Lazy Loading** - Chargement paresseux des images
- **Code Splitting** - Division du code par route
- **Caching** - Mise en cache des requêtes API
- **Optimisation** - Bundle size optimisé avec Vite

## 🔌 Intégration API

### Configuration Axios
```typescript
const apiClient = axios.create({
  baseURL: 'http://localhost:3004',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})
```

### Services API
- **furniture.service.ts** - CRUD meubles
- **materials.service.ts** - CRUD matériaux
- **suppliers.service.ts** - CRUD fournisseurs
- **search.service.ts** - Recherche globale

### Gestion d'État
- **Reactive Data** - Vue 3 Composition API
- **Computed Properties** - Données calculées
- **Watchers** - Observation des changements
- **Provide/Inject** - Partage de données

## 🎨 Pages disponibles

- `/` - Accueil
- `/furniture` - Catalogue meubles
- `/furniture/:id` - Détail meuble
- `/materials` - Liste matériaux
- `/materials/:id` - Détail matériau
- `/suppliers` - Liste fournisseurs
- `/suppliers/:id` - Détail fournisseur
- `/about` - À propos
- `/contact` - Contact

---
