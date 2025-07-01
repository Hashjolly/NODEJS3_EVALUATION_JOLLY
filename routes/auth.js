const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { redirectIfAuth, requireAuth } = require('../middleware/auth');

// Page de connexion
router.get('/login', redirectIfAuth, (req, res) => {
  res.render('auth/login', {
    title: 'Connexion',
    error: req.session.error
  });
  delete req.session.error;
});

// Traitement de la connexion
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      req.session.error = 'Nom d\'utilisateur ou mot de passe incorrect';
      return res.redirect('/auth/login');
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      role: user.role
    };

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    req.session.error = 'Erreur lors de la connexion';
    res.redirect('/auth/login');
  }
});

// Déconnexion
router.post('/logout', requireAuth, (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
