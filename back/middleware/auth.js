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
      message: 'Vous n\'avez pas les permissions d\'administrateur nécessaires.',
      error: { status: 403 }
    });
  }
};

const requirePermission = (permission) => {
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
  requirePermission,
  redirectIfAuth
};
