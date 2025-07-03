# 🎯 Projet Gestion des Meubles - Guide de Démarrage

## 📋 Structure du Projet

```
EVALUATION/
├── back/                    # Backend Node.js/Express
│   ├── app.js              # Serveur principal
│   ├── config/             # Configuration DB
│   ├── models/             # Modèles Mongoose
│   ├── routes/             # Routes API
│   ├── views/              # Templates Pug
│   ├── middleware/         # Middleware auth
│   └── public/             # Fichiers statiques
├── front/                  # Frontend Vue.js
│   ├── src/                # Code source Vue
│   ├── public/             # Assets publics
│   └── vite.config.ts      # Configuration Vite
├── package.json            # Scripts d'orchestration
└── README.md               # Documentation
```

## 🚀 Installation et Démarrage

### Installation Complète
```bash
# Installer toutes les dépendances (back + front)
npm run install:all
```

### Démarrage des Serveurs
```bash
# Démarrer le backend ET le frontend simultanément
npm run dev
```

Les serveurs se lancent automatiquement :
- 🔙 **Backend** : http://localhost:3000
- 🎨 **Frontend** : http://localhost:5173

## 🗄️ Configuration de la Base de Données

### Prérequis
- MongoDB installé et en cours d'exécution
- Variables d'environnement configurées dans `back/.env`

### Initialisation de la Base de Données
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
1. Accédez à http://localhost:3000
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

### Backend (Port 3000)
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

## 🔧 Dépannage

### Problèmes Courants

**Erreur de connexion MongoDB**
```bash
# Vérifier que MongoDB est démarré
sudo systemctl start mongod  # Linux
brew services start mongodb  # macOS
```

**Erreur de port occupé**
```bash
# Changer les ports dans les fichiers de configuration
# Backend: back/app.js ou back/.env
# Frontend: front/vite.config.ts
```

**Erreur d'installation**
```bash
# Nettoyer et réinstaller
npm run clean
npm run install:all
```

## 📚 Documentation Additionnelle

- `USER_MANAGEMENT.md` - Guide détaillé de la gestion des utilisateurs
- `DATABASE_SCHEMA.md` - Schéma de la base de données
- `back/README.md` - Documentation spécifique au backend
- `front/README.md` - Documentation spécifique au frontend

---

**Version** : 1.0.0  
**Dernière mise à jour** : Juillet 2025  
**Auteur** : Équipe de développement
