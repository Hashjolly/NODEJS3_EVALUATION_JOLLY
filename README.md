# 🎯 Projet Gestion des Meubles - Fullstack Vue.js & Node.js

> Site vitrine moderne avec backend sécurisé pour la gestion de meubles, matériaux et fournisseurs

## 📋 Architecture du Projet

```
EVALUATION/
├── back/                           # 🔙 Backend Node.js/Express/MongoDB
│   ├── app.js                     # ⚡ Serveur principal avec sécurité
│   ├── config/
│   │   ├── database.js            # 🗄️ Configuration MongoDB
│   │   └── logger.js              # 📝 Configuration Winston
│   ├── middleware/
│   │   ├── auth.js                # 🔐 Authentification
│   ├── models/                    # 📊 Modèles Mongoose
│   │   ├── Furniture.js           # 🪑 Modèle meubles
│   │   ├── Material.js            # 🔧 Modèle matériaux
│   │   ├── Supplier.js            # 🏭 Modèle fournisseurs
│   │   └── User.js                # 👤 Modèle utilisateurs
│   ├── routes/                    # 🛣️ Routes API et web
│   │   ├── api.js                 # 📡 Routes API REST
│   │   ├── auth.js                # 🔑 Routes authentification
│   │   ├── dashboard.js           # 📊 Dashboard admin
│   │   ├── furniture.js           # 🪑 Routes meubles
│   │   ├── materials.js           # 🔧 Routes matériaux
│   │   ├── suppliers.js           # 🏭 Routes fournisseurs
│   │   └── users.js               # 👥 Routes utilisateurs
│   ├── views/                     # 🎨 Templates Pug
│   ├── public/                    # 📁 Assets statiques
│   ├── logs/                      # 📋 Logs Winston
│   └── .env                       # ⚙️ Variables d'environnement
├── front/                         # 🎨 Frontend Vue.js/TypeScript
│   ├── src/
│   │   ├── components/            # 🧩 Composants réutilisables
│   │   ├── views/                 # 📄 Pages principales
│   │   │   ├── Home.vue           # 🏠 Page d'accueil
│   │   │   ├── Furniture.vue      # 🪑 Catalogue meubles
│   │   │   ├── FurnitureDetail.vue # 🔍 Détail meuble
│   │   │   ├── Materials.vue      # 🔧 Liste matériaux
│   │   │   ├── MaterialDetail.vue # 🔍 Détail matériau
│   │   │   ├── Suppliers.vue      # 🏭 Liste fournisseurs
│   │   │   ├── SupplierDetail.vue # 🔍 Détail fournisseur
│   │   │   ├── About.vue          # ℹ️ À propos
│   │   │   └── Contact.vue        # 📞 Contact
│   │   ├── services/
│   │   │   └── api.ts             # 🔌 Client API TypeScript
│   │   ├── router/
│   │   │   └── index.ts           # 🛣️ Configuration Vue Router
│   │   └── assets/                # 🎨 Assets CSS/images
│   ├── public/                    # 📁 Assets publics
│   └── package.json               # 📦 Configuration NPM
├── docs/                          # 📚 Documentation
│   ├── SECURITY.md                # 🛡️ Guide sécurité
│   ├── LOGGING.md                 # 📝 Guide logging
│   ├── RATE-LIMITING.md           # ⏱️ Guide rate limiting
│   └── FINAL-STATUS.md            # ✅ Status final
├── package.json                   # 🎛️ Scripts d'orchestration
└── README.md                      # 📖 Documentation principale
```

## 🚀 Installation et Démarrage Rapide

### 1. Prérequis
- **Node.js** (v16+)
- **MongoDB** (en cours d'exécution)
- **Git**

### 2. Installation Complète
```bash
# Cloner le projet
git clone https://github.com/Hashjolly/NODEJS3_EVALUATION_JOLLY.git
cd EVALUATION

# Installer toutes les dépendances (backend + frontend)
npm run install:all
```

### 3. Configuration
```bash
# Copier et configurer les variables d'environnement
cp back/.env.example back/.env
# Éditer back/.env avec vos paramètres MongoDB
```

### 4. Initialisation de la Base de Données
```bash
# Créer les collections et données de test
npm run init-db

# Créer un compte administrateur
npm run create-admin
```

### 5. Démarrage des Serveurs
```bash
# Démarrer backend ET frontend simultanément
npm run dev
```

**Accès aux applications :**
- 🎨 **Frontend (Site vitrine)** : http://localhost:5173
- 🔙 **Backend (Admin)** : http://localhost:3004
- 📡 **API REST** : http://localhost:3004/api

## 🔧 Technologies Utilisées

### Backend
- **Node.js** & **Express.js** - Serveur web
- **MongoDB** & **Mongoose** - Base de données
- **Pug** - Templates HTML
- **Winston** - Système de logging
- **bcrypt** - Hachage mots de passe
- **Express Session** - Gestion sessions

### Frontend
- **Vue.js 3** - Framework frontend
- **TypeScript** - Langage typé
- **Vite** - Build tool moderne
- **Vue Router** - Routage
- **Axios** - Client HTTP
- **CSS moderne** - Responsive design

### Sécurité
- **Data Validation** - Validation et sanitisation
- **Permissions System** - Contrôle d'accès

## 📡 API REST

### Endpoints Principaux
```
GET    /api/furniture        # Liste des meubles
GET    /api/furniture/:id    # Détail d'un meuble
POST   /api/furniture        # Créer un meuble
PUT    /api/furniture/:id    # Modifier un meuble
DELETE /api/furniture/:id    # Supprimer un meuble

GET    /api/materials        # Liste des matériaux
GET    /api/materials/:id    # Détail d'un matériau
POST   /api/materials        # Créer un matériau
PUT    /api/materials/:id    # Modifier un matériau
DELETE /api/materials/:id    # Supprimer un matériau

GET    /api/suppliers        # Liste des fournisseurs
GET    /api/suppliers/:id    # Détail d'un fournisseur
POST   /api/suppliers        # Créer un fournisseur
PUT    /api/suppliers/:id    # Modifier un fournisseur
DELETE /api/suppliers/:id    # Supprimer un fournisseur

GET    /api/users            # Liste des utilisateurs (admin)
POST   /api/users            # Créer un utilisateur (admin)
PUT    /api/users/:id        # Modifier un utilisateur (admin)
DELETE /api/users/:id        # Supprimer un utilisateur (admin)
```

### Format des Réponses
```json
{
  "success": true,
  "data": [...],
  "message": "Opération réussie",
  "timestamp": "2025-07-04T15:30:00.000Z"
}
```

## 🎨 Interface Utilisateur (Frontend)

### Pages Disponibles
- **/** - Page d'accueil avec présentation
- **/furniture** - Catalogue des meubles avec filtres
- **/furniture/:id** - Détail d'un meuble avec spécifications
- **/materials** - Liste des matériaux avec recherche
- **/materials/:id** - Détail d'un matériau avec propriétés
- **/suppliers** - Répertoire des fournisseurs
- **/suppliers/:id** - Profil détaillé d'un fournisseur
- **/about** - À propos de l'entreprise
- **/contact** - Informations de contact

### Fonctionnalités
- ✅ **Responsive Design** - Adaptatif mobile/desktop
- ✅ **Recherche Avancée** - Par nom, catégorie, mots-clés
- ✅ **Filtrage Intelligent** - Par statut, prix, matériaux
- ✅ **Navigation Fluide** - Router Vue.js
- ✅ **Interface Moderne** - Design épuré et intuitif
- ✅ **Performance Optimisée** - Chargement rapide

## 🛡️ Sécurité Avancée

### Protections Implémentées
- **Data Validation** - Sanitisation des entrées
- **XSS Prevention** - Échappement automatique
- **SQL Injection** - Protection Mongoose
- **Brute Force** - Détection et blocage

### Système de Permissions
- **Admin** - Accès complet toutes fonctionnalités
- **Manager** - Gestion meubles, matériaux, fournisseurs
- **User** - Lecture seule et recherche
- **Guest** - Accès public limité

## 📝 Système de Logging

### Fonctionnalités
- ✅ **Rotation automatique** - Fichiers par date
- ✅ **Niveaux configurables** - Error, Warn, Info, Debug
- ✅ **Format JSON** - Logs structurés
- ✅ **Métadonnées** - Contexte détaillé
- ✅ **Archivage** - Conservation longue durée

## � Dashboard Administrateur

### Fonctionnalités Admin
- **Vue d'ensemble** - Statistiques temps réel
- **Gestion Meubles** - CRUD complet avec images
- **Gestion Matériaux** - Catalogue avec spécifications
- **Gestion Fournisseurs** - Répertoire avec contacts
- **Gestion Utilisateurs** - Administration complète
- **Monitoring** - Logs et performances
- **Rapports** - Génération de statistiques

## 📝 Scripts NPM Disponibles

### Scripts Principaux
```bash
npm run dev              # Démarrer les serveurs développement
npm run install:all      # Installer toutes dépendances
npm run build           # Build production frontend
npm run start           # Démarrer en mode production
npm run clean           # Nettoyer node_modules
```

### Scripts Base de Données
```bash
npm run init-db         # Initialiser données de test
npm run create-admin    # Créer compte administrateur
npm run migrate-users   # Migrer utilisateurs existants
```

### Scripts Développement
```bash
npm run lint            # Vérifier qualité code
npm run test            # Exécuter tests
npm run logs            # Voir logs temps réel
```

## 🗄️ Configuration Base de Données

### Variables d'Environnement (.env)
```env
# Serveur
PORT=3004

# Base de données
MONGODB_URI=mongodb://localhost:27017/furniture_db
DB_NAME=furniture_db

# Sécurité
SESSION_SECRET=votre_clé_secrète_très_longue

# Administration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=mot_de_passe_sécurisé
```

### Collections MongoDB
- **furniture** - Données des meubles
- **materials** - Catalogue des matériaux
- **suppliers** - Informations fournisseurs
- **users** - Comptes utilisateurs
- **sessions** - Sessions actives

## 🔧 Développement

### Structure Backend
```
back/
├── app.js              # Configuration Express + middleware
├── config/
│   ├── database.js     # Connexion MongoDB
│   └── logger.js       # Configuration Winston
├── middleware/         # Middleware personnalisés
├── models/            # Schémas Mongoose
├── routes/            # Définition des routes
├── views/             # Templates Pug
├── public/            # Assets statiques
└── logs/              # Fichiers de logs
```

### Structure Frontend
```
front/
├── src/
│   ├── components/    # Composants Vue réutilisables
│   ├── views/         # Pages Vue principales
│   ├── services/      # Services API
│   ├── router/        # Configuration routing
│   └── assets/        # Styles et images
├── public/            # Assets publics
└── dist/              # Build de production
```

## 🧪 Tests et Qualité

### Tests Disponibles
- **Tests Unitaires** - Modèles et services
- **Tests d'Intégration** - API endpoints
- **Tests E2E** - Parcours utilisateur
- **Tests Sécurité** - Vulnérabilités

### Métriques Qualité
- **Couverture Code** - ESLint + Prettier
- **Performance** - Lighthouse audit
- **Sécurité** - npm audit + OWASP
- **Accessibilité** - Standards WCAG

## 🚀 Déploiement Production

### Prérequis Production
- **Node.js** v18+ LTS
- **MongoDB** Atlas ou instance dédiée
- **Nginx** reverse proxy
- **SSL/TLS** certificats HTTPS

### Variables Production
```env
NODE_ENV=production
PORT=3004
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/furniture_db
SESSION_SECRET=clé_secrète_production_très_longue_et_sécurisée
```

### Build et Déploiement
```bash
# Build frontend
cd front && npm run build
```

## 📊 Status du Projet

**Version :** 1.0.0 ✅  
**Status :** Production Ready  
**Dernière mise à jour :** 04/07/2025  

### Fonctionnalités Complétées ✅
- [x] Backend Node.js/Express sécurisé
- [x] Frontend Vue.js moderne et responsive
- [x] API REST complète
- [x] Système d'authentification
- [x] Gestion des permissions
- [x] Logging avancé avec Winston
- [x] Sécurité renforcée (Rate limiting, CSRF, etc.)
- [x] Dashboard administrateur
- [x] Site vitrine public
- [x] Documentation complète

**🎯 Projet prêt pour la production !**
```bash
# Créer les collections et données de test
npm run init-db

# Créer un compte administrateur
npm run create-admin
```

## 🔐 Gestion des Utilisateurs

### Fonctionnalités Implémentées
- ✅ **Authentification** : Login/Logout sécurisé
- ✅ **Gestion des Rôles** : Admin, Utilisateur, Invité
- ✅ **CRUD Utilisateurs** : Créer, Lire, Modifier, Supprimer
- ✅ **Permissions** : Contrôle d'accès par rôle
- ✅ **Validation** : Validation des données utilisateur

### Accès à l'Interface
1. Accédez à http://localhost:3004
2. Connectez-vous avec le compte admin créé
3. Naviguez vers "Gestion des Utilisateurs"

## 📝 Scripts Disponibles

### Scripts Principaux
- `npm run dev` - Démarrer les serveurs de développement
- `npm run install:all` - Installer toutes les dépendances
- `npm run build` - Construire l'application pour production
- `npm run start` - Démarrer en mode production

### Scripts de Base de Données
- `npm run init-db` - Initialiser la base de données
- `npm run create-admin` - Créer un compte administrateur
- `npm run migrate-users` - Migrer les anciens utilisateurs

### Scripts Utilitaires
- `npm run clean` - Nettoyer les node_modules
- `npm run lint` - Vérifier le code
- `npm run test` - Exécuter les tests

## 🛠️ Développement

### Backend (Port 3004)
- **Framework** : Express.js
- **Base de données** : MongoDB avec Mongoose
- **Templates** : Pug
- **Authentification** : Sessions Express
- **Middleware** : Contrôle d'accès par rôle

### Frontend (Port 5173)
- **Framework** : Vue.js 3
- **Build Tool** : Vite
- **Langage** : TypeScript
- **Styles** : CSS moderne

## 🔍 Fonctionnalités Principales

### Gestion des Meubles
- Créer, modifier, supprimer des meubles
- Associer matériaux et fournisseurs
- Recherche et filtrage avancés

### Gestion des Matériaux
- Catalogue complet des matériaux
- Organisation par catégories
- Gestion des fournisseurs

### Gestion des Fournisseurs
- Informations complètes des fournisseurs
- Historique des collaborations
- Gestion des contacts

### Gestion des Utilisateurs (Nouveau)
- Interface d'administration
- Contrôle des permissions
- Audit des actions utilisateur

## 🔒 Sécurité

- **Authentification** : Sessions sécurisées
- **Authorisation** : Contrôle d'accès basé sur les rôles
- **Validation** : Validation côté client et serveur
- **Protection CSRF** : Jetons de sécurité
- **Mots de passe** : Hachage bcrypt

## 📊 Tableau de Bord

L'interface d'administration offre :
- Vue d'ensemble des statistiques
- Accès rapide aux fonctionnalités
- Gestion centralisée des données
- Interface utilisateur intuitive