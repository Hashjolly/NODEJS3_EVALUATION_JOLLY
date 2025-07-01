const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect('/auth/login');
  }
};

const requireAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).render('error', {
      title: 'Accès refusé',
      message: 'Vous n\'avez pas les permissions nécessaires.',
      error: { status: 403 }
    });
  }
};

const redirectIfAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect('/dashboard');
  } else {
    return next();
  }
};

module.exports = {
  requireAuth,
  requireAdmin,
  redirectIfAuth
};
