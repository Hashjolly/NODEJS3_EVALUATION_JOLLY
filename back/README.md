# 🔙 Backend - API Node.js/Express/MongoDB

> API REST sécurisée pour la gestion de meubles, matériaux et fournisseurs avec dashboard administrateur

## 🚀 Démarrage Rapide

```bash
# Installation des dépendances
npm install

# Configuration environnement
cp .env.example .env
# Éditer .env avec vos paramètres

# Initialiser la base de données
node init-db.js

# Créer un compte admin
node create-admin.js

# Démarrer le serveur
npm start
# ou pour le développement
npm run dev
```

**Accès :** http://localhost:3004

## 🏗️ Architecture

```
back/
├── app.js                          # 🎯 Application principale Express
├── config/
│   ├── database.js                 # 🗄️ Configuration MongoDB
│   └── logger.js                   # 📝 Configuration Winston
├── middleware/
│   ├── auth.js                     # 🔐 Authentification sessions
│   ├── rateLimiting.js             # ⏱️ Limitation de requêtes
│   ├── validation.js               # ✅ Validation & sanitisation
│   ├── permissions.js              # 👥 Contrôle d'accès
│   └── csrfProtection.js           # 🛡️ Protection CSRF
├── models/
│   ├── Furniture.js                # 🪑 Schéma meubles
│   ├── Material.js                 # 🔧 Schéma matériaux
│   ├── Supplier.js                 # 🏭 Schéma fournisseurs
│   └── User.js                     # 👤 Schéma utilisateurs
├── routes/
│   ├── api.js                      # 📡 Routes API REST
│   ├── auth.js                     # 🔑 Routes authentification
│   ├── dashboard.js                # 📊 Dashboard admin
│   ├── furniture.js                # 🪑 Routes meubles web
│   ├── materials.js                # 🔧 Routes matériaux web
│   ├── suppliers.js                # 🏭 Routes fournisseurs web
│   ├── users.js                    # 👥 Routes utilisateurs
│   └── index.js                    # � Route principale
├── views/                          # 🎨 Templates Pug
│   ├── layout.pug                  # 📋 Layout principal
│   ├── index.pug                   # 🏠 Page d'accueil
│   ├── dashboard/                  # 📊 Vues dashboard
│   ├── furniture/                  # 🪑 Vues meubles
│   ├── materials/                  # 🔧 Vues matériaux
│   ├── suppliers/                  # 🏭 Vues fournisseurs
│   └── auth/                       # 🔐 Vues authentification
├── public/
│   ├── css/                        # 🎨 Styles CSS
│   └── js/                         # ⚡ Scripts JavaScript
├── logs/                           # 📋 Fichiers de logs Winston
└── .env                            # ⚙️ Variables d'environnement
```

## 📡 API REST

### Endpoints Meubles
```http
GET    /api/furniture           # Liste tous les meubles
GET    /api/furniture/:id       # Détail d'un meuble
POST   /api/furniture           # Créer un meuble
PUT    /api/furniture/:id       # Modifier un meuble
DELETE /api/furniture/:id       # Supprimer un meuble
```

### Endpoints Matériaux
```http
GET    /api/materials           # Liste tous les matériaux
GET    /api/materials/:id       # Détail d'un matériau
POST   /api/materials           # Créer un matériau
PUT    /api/materials/:id       # Modifier un matériau
DELETE /api/materials/:id       # Supprimer un matériau
```

### Endpoints Fournisseurs
```http
GET    /api/suppliers           # Liste tous les fournisseurs
GET    /api/suppliers/:id       # Détail d'un fournisseur
POST   /api/suppliers           # Créer un fournisseur
PUT    /api/suppliers/:id       # Modifier un fournisseur
DELETE /api/suppliers/:id       # Supprimer un fournisseur
```

### Endpoints Utilisateurs (Admin)
```http
GET    /api/users               # Liste utilisateurs (admin)
POST   /api/users               # Créer utilisateur (admin)
PUT    /api/users/:id           # Modifier utilisateur (admin)
DELETE /api/users/:id           # Supprimer utilisateur (admin)
```

### Authentification
```http
POST   /auth/login              # Connexion
POST   /auth/logout             # Déconnexion
GET    /auth/check              # Vérifier session
```

## 🛡️ Sécurité

### Middleware de Sécurité
- **CSRF Protection** - Tokens anti-CSRF
- **Data Validation** - Sanitisation des entrées
- **Session Security** - Sessions sécurisées
- **Brute Force Prevention** - Détection d'attaques


### Permissions
- **Admin** - Accès complet
- **Manager** - CRUD meubles/matériaux/fournisseurs
- **User** - Lecture seule
- **Guest** - Accès public limité

## 📝 Logging avec Winston

### Types de Logs
```
logs/
├── app.log              # Logs généraux application
├── error.log            # Erreurs uniquement
├── debug.log            # Logs de débogage
├── auth.log             # Événements authentification
├── security.log         # Alertes sécurité
└── performance.log      # Métriques performance
```

### Niveaux de Log
- **Error** - Erreurs critiques
- **Warn** - Avertissements
- **Info** - Informations générales
- **Debug** - Débogage détaillé

### Format des Logs
```json
{
  "level": "info",
  "message": "User login successful",
  "timestamp": "2025-07-04T15:30:00.000Z",
  "service": "furniture-management",
  "userId": "user_123",
  "ip": "127.0.0.1",
  "userAgent": "Mozilla/5.0..."
}
```
- **Tableau de bord** : Statistiques et graphiques avec Chart.js
- **Recherche avancée** : Recherche par mots-clés et filtres
- **Interface responsive** : Design moderne basé sur Bootstrap 5

## 🛠 Technologies utilisées

- **Backend** : Node.js, Express.js
- **Base de données** : MongoDB avec Mongoose
- **Template engine** : Pug
- **Frontend** : Bootstrap 5, Chart.js
- **Authentification** : Sessions avec bcryptjs
- **Autres** : dotenv, express-session, connect-mongo

## 📋 Prérequis

- Node.js (version 14 ou supérieure)
- MongoDB (local ou cloud)
- Git

## 🚀 Installation et démarrage

### 1. Cloner le projet

```bash
git clone https://github.com/Hashjolly/NODEJS3_EVALUATION_JOLLY.git
cd furniture-management-app
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de l'environnement

Copiez le fichier `.env` et ajustez les variables selon votre configuration :

```bash
# Variables d'environnement
PORT=3004
MONGODB_URI=mongodb://localhost:27017/furniture_db
SESSION_SECRET=votre_secret_session_ici

# Base de données
DB_NAME=furniture_db

# Authentification
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### 4. Démarrer MongoDB

Assurez-vous que MongoDB est démarré sur votre système :

```bash
# Sur Windows avec MongoDB installé
mongod

# Ou utilisez MongoDB Compass pour une interface graphique
```

### 5. Initialiser la base de données

```bash
node init-db.js
```

Cette commande va :
- Créer un utilisateur administrateur (admin/admin123) avec tous les privilèges
- Créer les fournisseurs (BBois, MetaLo, pPlastique)
- Créer les matériaux de base (Frêne, Chêne, Noyer, Acier inox, Aluminium, Plastique)
- Créer quelques meubles d'exemple

**Ou utilisez les scripts spécialisés :**

```bash
# Créer seulement l'administrateur
npm run create-admin

# Créer des utilisateurs de test (manager et user)
npm run create-test-users

# Migrer les utilisateurs existants vers le nouveau format
npm run migrate-users
```

### 6. Démarrer l'application

```bash
# Mode développement avec rechargement automatique
npm run dev

# ou mode production
npm start
```

L'application sera accessible à l'adresse : http://localhost:3004

### 7. Se connecter

- **Nom d'utilisateur** : admin
- **Mot de passe** : admin123

## 🎨 Interface utilisateur

L'interface utilise **Bootstrap 5 Admin Dashboard Theme** avec :
- Navigation responsive
- Cartes de statistiques
- Graphiques interactifs (Chart.js)
- Tableaux de données
- Formulaires stylisés
- Design moderne et professionnel

## 🔧 Développement

### Ajouter de nouvelles fonctionnalités

1. **Nouveau modèle** : Créer dans `/models/`
2. **Nouvelles routes** : Ajouter dans `/routes/`
3. **Nouvelles vues** : Créer dans `/views/`
4. **Styles** : Modifier `/public/css/admin.css`
5. **JavaScript** : Ajouter dans `/public/js/app.js`

### Scripts utiles

```bash
# Démarrage en développement
npm run dev

# Démarrage en production
npm start

# Réinitialiser la base de données complète
node init-db.js

# Gestion des utilisateurs
npm run create-admin          # Créer un administrateur
npm run create-test-users     # Créer des utilisateurs de test
npm run migrate-users         # Migrer les utilisateurs existants
npm run setup                 # Configuration complète (migration + admin)
```

## 🚀 Déploiement

### Préparation pour la production

1. **Variables d'environnement** :
   - Changer `SESSION_SECRET`
   - Utiliser une base MongoDB cloud (MongoDB Atlas)
   - Configurer les URLs de production

2. **Optimisations** :
   - Minification des assets CSS/JS
   - Configuration des en-têtes de sécurité
   - Mise en place d'un reverse proxy (Nginx)

## 🔒 Sécurité

- Mots de passe hashés avec bcryptjs
- Sessions sécurisées
- Validation des entrées utilisateur
- Authentification requise pour les données sensibles
- Système de permissions granulaires par rôle

## 👥 Gestion des Utilisateurs

### Rôles disponibles

1. **Administrateur (admin)** :
   - Accès complet à toutes les fonctionnalités
   - Gestion des utilisateurs (création, modification, suppression)
   - Tableau de bord administrateur
   - Toutes les permissions automatiquement

2. **Manager (manager)** :
   - Lecture/écriture des meubles, matériaux, fournisseurs
   - Lecture des utilisateurs
   - Accès aux rapports et statistiques

3. **Utilisateur (user)** :
   - Lecture seule des meubles, matériaux, fournisseurs
   - Accès limité au système

### Comptes de test

Après l'exécution de `npm run create-test-users` :

- **Admin** : `admin` / `admin123`
- **Manager** : `manager` / `manager123`
- **Utilisateur** : `user` / `user123`

⚠️ **Important** : Changez ces mots de passe en production !

### Permissions granulaires

Le système utilise des permissions spécifiques :
- `read_furniture`, `write_furniture`, `delete_furniture`
- `read_materials`, `write_materials`, `delete_materials`
- `read_suppliers`, `write_suppliers`, `delete_suppliers`
- `read_users`, `write_users`, `delete_users`
- `admin_dashboard`