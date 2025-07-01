# Schéma de Base de Données - Application Gestion Meubles

## Vue d'ensemble

Cette base de données MongoDB utilise 4 collections principales pour gérer les meubles, matériaux, fournisseurs et utilisateurs.

## Collections et Relations

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     Users       │       │   Suppliers     │       │   Materials     │
│─────────────────│       │─────────────────│       │─────────────────│
│ _id (ObjectId)  │       │ _id (ObjectId)  │◄──────│ _id (ObjectId)  │
│ username        │       │ name            │       │ name            │
│ password        │       │ description     │       │ category        │
│ role            │       │ contact         │       │ type            │
│ createdAt       │       │ createdAt       │       │ supplier        │
│ updatedAt       │       │ updatedAt       │       │ unitPrice       │
└─────────────────┘       └─────────────────┘       │ unit            │
                                                    │ description     │
                                                    │ keywords[]      │
                                                    │ createdAt       │
                                                    │ updatedAt       │
                                                    └─────────────────┘
                                                            ▲
                                                            │
                          ┌─────────────────┐               │
                          │   Furniture     │               │
                          │─────────────────│               │
                          │ _id (ObjectId)  │               │
                          │ name            │               │
                          │ category        │               │
                          │ description     │               │
                          │ materials[] ────┼───────────────┘
                          │   - material    │
                          │   - quantity    │
                          │   - unit        │
                          │ totalCost       │
                          │ designDate      │
                          │ status          │
                          │ keywords[]      │
                          │ notes           │
                          │ createdAt       │
                          │ updatedAt       │
                          └─────────────────┘
```

## Détail des Collections

### 1. Users (Utilisateurs)
Gestion des comptes utilisateurs avec authentification.

| Champ     | Type     | Description                    | Contraintes              |
|-----------|----------|--------------------------------|--------------------------|
| _id       | ObjectId | Identifiant unique             | Auto-généré              |
| username  | String   | Nom d'utilisateur              | Requis, unique           |
| password  | String   | Mot de passe haché             | Requis, bcrypt           |
| role      | String   | Rôle utilisateur               | Enum: admin, user        |
| createdAt | Date     | Date de création               | Auto-généré              |
| updatedAt | Date     | Date de modification           | Auto-généré              |

**Index** : `username` (unique)

### 2. Suppliers (Fournisseurs)
Informations sur les entreprises fournissant les matériaux.

| Champ       | Type     | Description                    | Contraintes              |
|-------------|----------|--------------------------------|--------------------------|
| _id         | ObjectId | Identifiant unique             | Auto-généré              |
| name        | String   | Nom du fournisseur             | Requis, unique           |
| description | String   | Description du fournisseur     | Optionnel                |
| contact     | Object   | Informations de contact        | Optionnel                |
| - email     | String   | Email de contact               | Optionnel                |
| - phone     | String   | Téléphone                      | Optionnel                |
| - address   | String   | Adresse                        | Optionnel                |
| createdAt   | Date     | Date de création               | Auto-généré              |
| updatedAt   | Date     | Date de modification           | Auto-généré              |

**Index** : `name` (unique)

### 3. Materials (Matériaux)
Catalogue des matériaux disponibles avec leurs caractéristiques.

| Champ       | Type     | Description                    | Contraintes               |
|-------------|----------|--------------------------------|---------------------------|
| _id         | ObjectId | Identifiant unique             | Auto-généré               |
| name        | String   | Nom du matériau                | Requis                    |
| category    | String   | Catégorie du matériau          | Enum: Bois, Fer, Plastique|
| type        | String   | Type spécifique                | Requis                    |
| supplier    | ObjectId | Référence vers Suppliers       | Requis                    |
| unitPrice   | Number   | Prix unitaire                  | Défaut: 0                 |
| unit        | String   | Unité de mesure                | Défaut: "kg"              |
| description | String   | Description détaillée          | Optionnel                 |
| keywords    | Array    | Mots-clés pour recherche       | Optionnel                 |
| createdAt   | Date     | Date de création               | Auto-généré               |
| updatedAt   | Date     | Date de modification           | Auto-généré               |

**Index** : 
- Texte sur `name`, `keywords`, `description`
- `category`
- `supplier`

### 4. Furniture (Meubles)
Enregistrement des meubles créés avec leurs compositions.

| Champ       | Type     | Description                    | Contraintes              |
|-------------|----------|--------------------------------|--------------------------|
| _id         | ObjectId | Identifiant unique             | Auto-généré              |
| name        | String   | Nom du meuble                  | Requis                   |
| category    | String   | Catégorie du meuble            | Enum: Armoire, Etagère   |
| description | String   | Description du meuble          | Optionnel                |
| materials   | Array    | Liste des matériaux utilisés  | Optionnel                 |
| - material  | ObjectId | Référence vers Materials       | Requis si présent        |
| - quantity  | Number   | Quantité utilisée              | Requis, min: 0           |
| - unit      | String   | Unité de mesure                | Optionnel                |
| totalCost   | Number   | Coût total calculé             | Défaut: 0                |
| designDate  | Date     | Date de conception             | Défaut: Date.now         |
| status      | String   | Statut de production           | Enum: voir ci-dessous    |
| keywords    | Array    | Mots-clés pour recherche       | Optionnel                |
| notes       | String   | Notes additionnelles           | Optionnel                |
| createdAt   | Date     | Date de création               | Auto-généré              |
| updatedAt   | Date     | Date de modification           | Auto-généré              |

**Statuts possibles** :
- `Conception` : En phase de design
- `En production` : En cours de fabrication
- `Terminé` : Fabrication terminée
- `Livré` : Livré au client

**Index** : 
- Texte sur `name`, `keywords`, `description`
- `category`
- `status`

## Relations entre Collections

### 1. Suppliers → Materials (1:N)
- Un fournisseur peut fournir plusieurs matériaux
- Chaque matériau a un seul fournisseur
- Relation via `materials.supplier` → `suppliers._id`

### 2. Materials → Furniture.materials (N:M)
- Un matériau peut être utilisé dans plusieurs meubles
- Un meuble peut utiliser plusieurs matériaux
- Relation via tableau `furniture.materials[].material` → `materials._id`

## Exemples de Données

### Supplier
```json
{
  "_id": "ObjectId(...)",
  "name": "BBois",
  "description": "Fournisseur spécialisé dans les bois de qualité",
  "contact": {
    "email": "contact@bbois.fr",
    "phone": "01 23 45 67 89",
    "address": "123 Avenue du Bois, 75001 Paris"
  },
  "createdAt": "2025-01-01T10:00:00Z",
  "updatedAt": "2025-01-01T10:00:00Z"
}
```

### Material
```json
{
  "_id": "ObjectId(...)",
  "name": "Chêne",
  "category": "Bois",
  "type": "Bois massif",
  "supplier": "ObjectId(BBois)",
  "unitPrice": 52.75,
  "unit": "kg",
  "description": "Bois de chêne noble, parfait pour les meubles d'exception",
  "keywords": ["bois", "chêne", "noble", "durable", "classique"],
  "createdAt": "2025-01-01T10:00:00Z",
  "updatedAt": "2025-01-01T10:00:00Z"
}
```

### Furniture
```json
{
  "_id": "ObjectId(...)",
  "name": "Armoire Chêne Classic",
  "category": "Armoire",
  "description": "Armoire traditionnelle en chêne massif",
  "materials": [
    {
      "material": "ObjectId(Chêne)",
      "quantity": 45,
      "unit": "kg"
    },
    {
      "material": "ObjectId(Acier inox)",
      "quantity": 2,
      "unit": "kg"
    }
  ],
  "totalCost": 2386.25,
  "designDate": "2025-01-01T10:00:00Z",
  "status": "Terminé",
  "keywords": ["armoire", "chêne", "classique", "traditionnel"],
  "notes": "Finition huilée, poignées en acier brossé",
  "createdAt": "2025-01-01T10:00:00Z",
  "updatedAt": "2025-01-01T10:00:00Z"
}
```

## Règles Métier

### Calcul du coût total
Le coût total d'un meuble est calculé automatiquement :
```javascript
totalCost = Σ(quantité × prix_unitaire_matériau)
```

### Contraintes de données
1. **Catégories de matériaux** : Limitées à Bois, Fer, Plastique selon le cahier des charges
2. **Catégories de meubles** : Limitées à Armoire, Etagère selon le cahier des charges
3. **Fournisseurs obligatoires** : BBois, MetaLo, pPlastique selon le cahier des charges

### Validation
- Quantités de matériaux > 0
- Prix unitaires ≥ 0
- Emails valides pour les contacts fournisseurs
- Mots de passe hashés pour les utilisateurs

## Performances et Optimisation

### Index recommandés
```javascript
// Materials
db.materials.createIndex({ "name": "text", "keywords": "text", "description": "text" })
db.materials.createIndex({ "category": 1 })
db.materials.createIndex({ "supplier": 1 })

// Furniture
db.furniture.createIndex({ "name": "text", "keywords": "text", "description": "text" })
db.furniture.createIndex({ "category": 1 })
db.furniture.createIndex({ "status": 1 })
db.furniture.createIndex({ "materials.material": 1 })

// Users
db.users.createIndex({ "username": 1 }, { unique: true })

// Suppliers
db.suppliers.createIndex({ "name": 1 }, { unique: true })
```
