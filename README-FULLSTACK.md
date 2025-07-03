# 🏠 Furniture Management - Application Full-Stack

Une application complète de gestion des meubles avec architecture séparée front-end/back-end.

## 🏗️ Architecture

```
📁 furniture-management-fullstack/
├── 📁 back/                    # Backend Node.js + Express + MongoDB
│   ├── 📁 models/              # Modèles Mongoose
│   ├── 📁 routes/              # Routes Express
│   ├── 📁 middleware/          # Middlewares d'authentification
│   ├── 📁 views/               # Templates Pug (si SSR)
│   ├── 📁 public/              # Assets statiques
│   ├── 📁 config/              # Configuration base de données
│   ├── 📄 app.js               # Point d'entrée du serveur
│   └── 📄 package.json         # Dépendances backend
├── 📁 front/                   # Frontend Vue.js + Vite
│   ├── 📁 src/                 # Code source Vue
│   ├── 📁 public/              # Assets publics
│   ├── 📄 index.html           # Template HTML
│   ├── 📄 vite.config.ts       # Configuration Vite
│   └── 📄 package.json         # Dépendances frontend
├── 📄 package.json             # Scripts d'orchestration
└── 📄 README.md                # Ce fichier
```

## 🚀 Installation et Démarrage Rapide

### 1. Installation complète

```bash
# Installer toutes les dépendances (root + back + front)
npm install

# Ou manuellement
npm run install:all
```

### 2. Configuration de l'environnement

Copiez et configurez le fichier d'environnement du backend :

```bash
cp back/.env.example back/.env
```

Editez `back/.env` :
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/furniture_db
SESSION_SECRET=votre_secret_session_ultra_securise
```

### 3. Initialisation de la base de données

```bash
# Initialiser avec données de test
npm run init-db

# Ou créer seulement l'admin
npm run create-admin
```

### 4. Démarrage en mode développement

```bash
# Démarre le backend ET le frontend simultanément
npm run dev
```

Cela va démarrer :
- **Backend** : http://localhost:3000 (API + Templates Pug si utilisées)
- **Frontend** : http://localhost:5173 (Application Vue.js)

## 📜 Scripts Disponibles

### 🔧 Installation

```bash
npm run install:all        # Installe toutes les dépendances
npm run install:back       # Installe uniquement le backend
npm run install:front      # Installe uniquement le frontend
```

### 🏃‍♂️ Développement

```bash
npm run dev                # Démarre back + front en parallèle
npm run dev:back          # Démarre uniquement le backend
npm run dev:front         # Démarre uniquement le frontend
```

### 🏭 Production

```bash
npm run build             # Build le frontend pour production
npm run start             # Démarre en mode production
```

### 🗄️ Base de données

```bash
npm run init-db           # Initialise la DB avec données de test
npm run create-admin      # Crée un utilisateur admin
npm run create-test-users # Crée des utilisateurs de test
npm run migrate-users     # Migre les utilisateurs existants
```

### 🧹 Maintenance

```bash
npm run clean             # Nettoie tous les node_modules
npm run lint              # Vérifie le code (back + front)
npm run test              # Lance les tests (back + front)
```

## 🔗 URLs de Développement

| Service | URL | Description |
|---------|-----|-------------|
| **Backend API** | http://localhost:3000 | Serveur Express + API REST |
| **Frontend SPA** | http://localhost:5173 | Application Vue.js |
| **API Documentation** | http://localhost:3000/api-docs | Documentation Swagger (si configurée) |

## 🔐 Comptes de Test

Après avoir exécuté `npm run init-db` :

| Rôle | Username | Password | Permissions |
|------|----------|----------|-------------|
| **Admin** | `admin` | `admin123` | Accès complet |
| **Manager** | `manager` | `manager123` | Lecture/Écriture |
| **User** | `user` | `user123` | Lecture seule |

⚠️ **Changez ces mots de passe en production !**

## 🛠️ Développement

### Backend (Node.js + Express)

```bash
cd back
npm run dev    # Démarre avec nodemon (rechargement auto)
```

**Stack technique :**
- Node.js + Express.js
- MongoDB + Mongoose
- Sessions + bcryptjs
- Templates Pug (optionnel)
- Middleware d'authentification

### Frontend (Vue.js + Vite)

```bash
cd front
npm run dev    # Démarre le serveur de développement Vite
```

**Stack technique :**
- Vue.js 3 + Composition API
- Vite (build tool ultra-rapide)
- TypeScript
- CSS moderne

### Communication Front ↔ Back

Le frontend communique avec le backend via :

1. **API REST** : Endpoints `/api/*` pour les données JSON
2. **WebSocket** : Communication temps réel (optionnel)
3. **Authentification** : JWT ou sessions partagées

## 🔄 Workflow de Développement

### 1. Développement Full-Stack

```bash
# Terminal 1 : Démarre tout en parallèle
npm run dev

# Les deux serveurs redémarrent automatiquement lors des changements
```

### 2. Développement Backend uniquement

```bash
cd back
npm run dev

# API disponible sur http://localhost:3000
# Interface admin Pug sur http://localhost:3000/dashboard
```

### 3. Développement Frontend uniquement

```bash
cd front
npm run dev

# SPA Vue.js sur http://localhost:5173
# Hot reload automatique
```

## 🏭 Déploiement

### Build de Production

```bash
# Build le frontend
npm run build

# Les fichiers sont générés dans front/dist/
```

### Déploiement Backend

```bash
cd back
npm start

# Ou avec PM2
pm2 start app.js --name furniture-backend
```

### Déploiement Frontend

Les fichiers de `front/dist/` peuvent être servis par :
- Nginx
- Apache
- CDN (Netlify, Vercel, etc.)
- Le backend Express (en serving static)

### Variables d'Environnement Production

```env
# back/.env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://your-production-db/furniture_db
SESSION_SECRET=your-super-secure-secret-here
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🐛 Dépannage

### Problèmes courants

1. **Port déjà utilisé**
   ```bash
   # Vérifier les ports
   lsof -i :3000  # Backend
   lsof -i :5173  # Frontend
   ```

2. **Problème de CORS**
   - Vérifiez la configuration CORS dans `back/app.js`
   - Assurez-vous que l'URL du frontend est autorisée

3. **Base de données non accessible**
   ```bash
   # Vérifier MongoDB
   mongosh
   
   # Réinitialiser la DB
   npm run init-db
   ```

4. **Dépendances cassées**
   ```bash
   # Nettoyer et réinstaller
   npm run clean
   npm run install:all
   ```

## 📚 Documentation

- [Backend README](./back/README.md) - Documentation API détaillée
- [Frontend README](./front/README.md) - Guide composants Vue
- [USER_MANAGEMENT.md](./USER_MANAGEMENT.md) - Système utilisateurs
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Schéma de base de données

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commitez vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Pushez vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

---

**🎉 Bon développement !**
