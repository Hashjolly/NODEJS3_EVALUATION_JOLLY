# Application de Gestion des Meubles

Une application web complète pour la gestion des meubles, matériaux et fournisseurs destinée aux designers d'ameublement.

## 🎯 Fonctionnalités

- **Gestion des meubles** : Création, consultation et gestion des meubles avec leurs matériaux
- **Gestion des matériaux** : Base de données complète des matériaux et fournisseurs
- **Gestion des utilisateurs** : Interface d'administration complète des utilisateurs avec rôles et permissions
- **Système d'authentification** : Connexion sécurisée avec gestion des rôles (admin, manager, user)
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
PORT=3000
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

L'application sera accessible à l'adresse : http://localhost:3000

### 7. Se connecter

- **Nom d'utilisateur** : admin
- **Mot de passe** : admin123

## 📁 Structure du projet

```
/
├── app.js                  # Point d'entrée de l'application
├── package.json           # Dépendances et scripts
├── init-db.js             # Script d'initialisation de la base de données
├── .env                   # Variables d'environnement
├── config/
│   └── database.js        # Configuration MongoDB
├── models/
│   ├── User.js           # Modèle utilisateur
│   ├── Supplier.js       # Modèle fournisseur
│   ├── Material.js       # Modèle matériau
│   └── Furniture.js      # Modèle meuble
├── routes/
│   ├── index.js          # Routes principales
│   ├── auth.js           # Routes d'authentification
│   ├── furniture.js      # Routes des meubles
│   ├── materials.js      # Routes des matériaux
│   ├── suppliers.js      # Routes des fournisseurs
│   ├── users.js          # Routes de gestion des utilisateurs
│   └── dashboard.js      # Routes du tableau de bord
├── middleware/
│   └── auth.js           # Middleware d'authentification
├── views/                # Templates Pug
│   ├── layout.pug        # Template principal
│   ├── index.pug         # Page d'accueil
│   ├── error.pug         # Page d'erreur
│   ├── auth/
│   │   └── login.pug     # Page de connexion
│   └── dashboard/
│       └── index.pug     # Tableau de bord
└── public/               # Fichiers statiques
    ├── css/
    │   └── admin.css     # Styles personnalisés
    └── js/
        └── app.js        # JavaScript client
```

## 📊 Schéma de base de données

### Collections principales :

1. **Users** : Gestion des utilisateurs
   - username, email, password, firstName, lastName, role, permissions, isActive

2. **Suppliers** : Fournisseurs
   - name, description, contact

3. **Materials** : Matériaux
   - name, category, type, supplier, unitPrice, keywords

4. **Furniture** : Meubles
   - name, category, description, materials[], totalCost, status, keywords

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
- Protection CSRF (à implémenter)
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

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur le repository
- Contacter l'équipe de développement

---

**Note** : Ce projet est développé dans le cadre d'un cours Node.js et représente une application complète de gestion pour professionnels de l'ameublement.
