# Système de Gestion des Utilisateurs

Ce document décrit le système complet de gestion des utilisateurs implémenté dans l'application de gestion des meubles.

## Fonctionnalités Principales

### 1. Interface d'Administration des Utilisateurs

- **Liste des utilisateurs** avec pagination et filtres
- **Recherche** par nom, email, nom d'utilisateur
- **Filtrage** par rôle et statut
- **Statistiques** en temps réel
- **Actions en lot** pour la gestion efficace

### 2. Création et Gestion des Comptes

- **Formulaire de création** complet avec validation
- **Modification des profils** utilisateurs
- **Gestion des mots de passe** avec hachage sécurisé
- **Activation/Désactivation** des comptes
- **Suppression** des utilisateurs (avec protection)

### 3. Système de Rôles et Permissions

#### Rôles Disponibles

1. **Administrateur (admin)**
   - Accès complet à toutes les fonctionnalités
   - Gestion des utilisateurs
   - Tableau de bord administrateur
   - Toutes les permissions automatiquement

2. **Manager (manager)**
   - Lecture/écriture des meubles, matériaux, fournisseurs
   - Lecture des utilisateurs
   - Accès aux rapports

3. **Utilisateur (user)**
   - Lecture seule des meubles, matériaux, fournisseurs
   - Accès limité au système

#### Permissions Granulaires

- `read_furniture`, `write_furniture`, `delete_furniture`
- `read_materials`, `write_materials`, `delete_materials`
- `read_suppliers`, `write_suppliers`, `delete_suppliers`
- `read_users`, `write_users`, `delete_users`
- `admin_dashboard`

## Installation et Configuration

### 1. Migration des Utilisateurs Existants

Si vous avez déjà des utilisateurs dans votre base de données :

```bash
npm run migrate-users
```

### 2. Création de l'Administrateur

```bash
npm run create-admin
```

**Identifiants par défaut :**
- Nom d'utilisateur : `admin`
- Email : `admin@example.com`
- Mot de passe : `admin123`

⚠️ **Important** : Changez le mot de passe après la première connexion !

### 3. Création d'Utilisateurs de Test

```bash
npm run create-test-users
```

Cela créera :
- **Manager** : `manager` / `manager123`
- **Utilisateur** : `user` / `user123`

### 4. Configuration Complète

```bash
npm run setup
```

## Utilisation

### Accès à la Gestion des Utilisateurs

1. Connectez-vous en tant qu'administrateur
2. Accédez au menu "Utilisateurs" dans la navigation
3. Vous verrez la liste complète des utilisateurs

### Création d'un Nouvel Utilisateur

1. Cliquez sur "Nouvel utilisateur"
2. Remplissez le formulaire :
   - Prénom et nom
   - Nom d'utilisateur (unique)
   - Email (unique)
   - Mot de passe (minimum 6 caractères)
   - Rôle
3. Les permissions sont définies automatiquement selon le rôle
4. Cliquez sur "Créer l'utilisateur"

### Modification d'un Utilisateur

1. Cliquez sur l'icône "Modifier" dans la liste
2. Modifiez les informations nécessaires
3. Ajustez les permissions individuellement si nécessaire
4. Sauvegardez les modifications

### Gestion des Permissions

Les permissions peuvent être gérées de deux façons :

1. **Par rôle** : Les permissions sont définies automatiquement
2. **Individuellement** : Sélection manuelle des permissions spécifiques

## Sécurité

### Authentification

- Mots de passe hachés avec bcrypt
- Sessions sécurisées avec MongoDB
- Vérification des permissions à chaque requête

### Protection des Routes

- Middleware d'authentification obligatoire
- Vérification des permissions granulaires
- Protection contre les accès non autorisés

### Validation des Données

- Validation côté client et serveur
- Sanitisation des entrées utilisateur
- Vérification de l'unicité des identifiants

## Structure des Fichiers

```
routes/
  └── users.js              # Routes de gestion des utilisateurs

views/
  └── users/
      ├── index.pug         # Liste des utilisateurs
      ├── new.pug           # Création d'utilisateur
      ├── edit.pug          # Modification d'utilisateur
      └── show.pug          # Détails d'un utilisateur

models/
  └── User.js               # Modèle utilisateur étendu

middleware/
  └── auth.js               # Middleware d'authentification et permissions

public/css/
  └── admin.css             # Styles pour l'interface utilisateur
```

## API et Endpoints

### Routes Principales

- `GET /users` - Liste des utilisateurs
- `GET /users/new` - Formulaire de création
- `POST /users` - Créer un utilisateur
- `GET /users/:id` - Détails d'un utilisateur
- `GET /users/:id/edit` - Formulaire de modification
- `PUT /users/:id` - Mettre à jour un utilisateur
- `DELETE /users/:id` - Supprimer un utilisateur

### Filtres et Recherche

- `?search=terme` - Recherche textuelle
- `?role=admin|manager|user` - Filtre par rôle
- `?status=active|inactive` - Filtre par statut
- `?page=N` - Pagination