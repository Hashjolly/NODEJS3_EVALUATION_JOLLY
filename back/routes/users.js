const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// Middleware pour vérifier les permissions utilisateurs
const requireUserPermission = (permission) => {
  return (req, res, next) => {
    if (req.session && req.session.user) {
      const user = req.session.user;
      if (user.role === 'admin' || (user.permissions && user.permissions.includes(permission))) {
        return next();
      }
    }
    return res.status(403).render('error', {
      title: 'Accès refusé',
      message: 'Vous n\'avez pas les permissions nécessaires pour cette action.',
      error: { status: 403 }
    });
  };
};

// Liste des utilisateurs
router.get('/', requireAuth, requireUserPermission('read_users'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    
    const searchQuery = req.query.search || '';
    const roleFilter = req.query.role || '';
    const statusFilter = req.query.status || '';
    
    let filter = {};
    
    if (searchQuery) {
      filter.$or = [
        { username: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
        { firstName: { $regex: searchQuery, $options: 'i' } },
        { lastName: { $regex: searchQuery, $options: 'i' } }
      ];
    }
    
    if (roleFilter) {
      filter.role = roleFilter;
    }
    
    if (statusFilter) {
      filter.isActive = statusFilter === 'active';
    }
    
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);
    
    res.render('users/index', {
      title: 'Gestion des utilisateurs',
      users,
      currentPage: page,
      totalPages,
      totalUsers,
      searchQuery,
      roleFilter,
      statusFilter,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      nextPage: page + 1,
      prevPage: page - 1,
      message: req.query.message
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors du chargement des utilisateurs.',
      error: { status: 500 }
    });
  }
});

// Formulaire de création d'utilisateur
router.get('/new', requireAuth, requireUserPermission('write_users'), (req, res) => {
  // Récupérer les données de session et les supprimer immédiatement
  const sessionError = req.session.error;
  const sessionFormData = req.session.formData || {};
  delete req.session.error;
  delete req.session.formData;
  
  res.render('users/new', {
    title: 'Nouvel utilisateur',
    roles: ['user', 'manager', 'admin'],
    error: sessionError,
    formData: sessionFormData
  });
});

// Créer un nouvel utilisateur
router.post('/', requireAuth, requireUserPermission('write_users'), async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, role } = req.body;
    
    // Validation
    if (!username || !email || !password || !firstName || !lastName) {
      req.session.error = 'Tous les champs sont obligatoires.';
      req.session.formData = req.body;
      return res.redirect('/users/new');
    }
    
    if (password.length < 6) {
      req.session.error = 'Le mot de passe doit contenir au moins 6 caractères.';
      req.session.formData = req.body;
      return res.redirect('/users/new');
    }
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });
    
    if (existingUser) {
      req.session.error = 'Un utilisateur avec ce nom d\'utilisateur ou cet email existe déjà.';
      req.session.formData = req.body;
      return res.redirect('/users/new');
    }
    
    const newUser = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      role: role || 'user'
    });
    
    // Définir les permissions par défaut
    newUser.setDefaultPermissions();
    
    await newUser.save();
    
    res.redirect('/users?message=user_created');
  } catch (error) {
    console.error(error);
    req.session.error = 'Erreur lors de la création de l\'utilisateur.';
    req.session.formData = req.body;
    res.redirect('/users/new');
  }
});

// Afficher un utilisateur
router.get('/:id', requireAuth, requireUserPermission('read_users'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).render('error', {
        title: 'Utilisateur non trouvé',
        message: 'L\'utilisateur demandé n\'existe pas.',
        error: { status: 404 }
      });
    }
    
    res.render('users/show', {
      title: `Utilisateur: ${user.getFullName()}`,
      user,
      message: req.query.message
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors du chargement de l\'utilisateur.',
      error: { status: 500 }
    });
  }
});

// Formulaire d'édition d'utilisateur
router.get('/:id/edit', requireAuth, requireUserPermission('write_users'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).render('error', {
        title: 'Utilisateur non trouvé',
        message: 'L\'utilisateur demandé n\'existe pas.',
        error: { status: 404 }
      });
    }
    
    // Récupérer l'erreur et la supprimer immédiatement de la session
    const sessionError = req.session.error;
    delete req.session.error;
    
    res.render('users/edit', {
      title: `Modifier: ${user.getFullName()}`,
      user,
      roles: ['user', 'manager', 'admin'],
      allPermissions: [
        'read_furniture', 'write_furniture', 'delete_furniture',
        'read_materials', 'write_materials', 'delete_materials',
        'read_suppliers', 'write_suppliers', 'delete_suppliers',
        'read_users', 'write_users', 'delete_users',
        'admin_dashboard'
      ],
      error: sessionError
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors du chargement de l\'utilisateur.',
      error: { status: 500 }
    });
  }
});

// Mettre à jour un utilisateur
router.put('/:id', requireAuth, requireUserPermission('write_users'), async (req, res) => {
  try {
    const { username, email, firstName, lastName, role, permissions, isActive, password } = req.body;
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).render('error', {
        title: 'Utilisateur non trouvé',
        message: 'L\'utilisateur demandé n\'existe pas.',
        error: { status: 404 }
      });
    }
    
    // Vérifier si le nom d'utilisateur ou l'email existe déjà (pour un autre utilisateur)
    const existingUser = await User.findOne({
      _id: { $ne: req.params.id },
      $or: [{ username }, { email }]
    });
    
    if (existingUser) {
      req.session.error = 'Un autre utilisateur avec ce nom d\'utilisateur ou cet email existe déjà.';
      return res.redirect(`/users/${req.params.id}/edit`);
    }
    
    // Mise à jour des champs
    user.username = username;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.role = role;
    user.isActive = isActive === 'on';
    
    // Mise à jour du mot de passe si fourni
    if (password && password.trim() !== '') {
      if (password.length < 6) {
        req.session.error = 'Le mot de passe doit contenir au moins 6 caractères.';
        return res.redirect(`/users/${req.params.id}/edit`);
      }
      user.password = password;
    }
    
    // Mise à jour des permissions
    if (permissions) {
      user.permissions = Array.isArray(permissions) ? permissions : [permissions];
    } else {
      user.permissions = [];
    }
    
    await user.save();
    
    // Mettre à jour la session si c'est l'utilisateur connecté
    if (req.session.user.id === user._id.toString()) {
      req.session.user = {
        id: user._id,
        username: user.username,
        role: user.role,
        permissions: user.permissions
      };
    }
    
    res.redirect(`/users/${req.params.id}?message=user_updated`);
  } catch (error) {
    console.error(error);
    req.session.error = 'Erreur lors de la mise à jour de l\'utilisateur.';
    res.redirect(`/users/${req.params.id}/edit`);
  }
});

// Supprimer un utilisateur
router.delete('/:id', requireAuth, requireUserPermission('delete_users'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    
    // Empêcher la suppression de son propre compte
    if (req.session.user.id === user._id.toString()) {
      return res.status(400).json({ error: 'Vous ne pouvez pas supprimer votre propre compte' });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
  }
});

module.exports = router;
