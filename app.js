const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();

// Configuration de la base de données
require('./config/database');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Configuration des sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 24 heures
  }
}));

// Configuration du moteur de template
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Variables globales pour les templates
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/furniture', require('./routes/furniture'));
app.use('/materials', require('./routes/materials'));
app.use('/suppliers', require('./routes/suppliers'));
app.use('/dashboard', require('./routes/dashboard'));

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).render('error', { 
    title: 'Page non trouvée',
    message: 'La page que vous cherchez n\'existe pas.',
    error: { status: 404 }
  });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Erreur serveur',
    message: 'Une erreur interne est survenue.',
    error: { status: 500 }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log('Visitez http://localhost:' + PORT + ' pour accéder à l\'application');
});
