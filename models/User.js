const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'user'],
    default: 'user'
  },
  permissions: [{
    type: String,
    enum: ['read_furniture', 'write_furniture', 'delete_furniture', 
           'read_materials', 'write_materials', 'delete_materials',
           'read_suppliers', 'write_suppliers', 'delete_suppliers',
           'read_users', 'write_users', 'delete_users',
           'admin_dashboard']
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Hachage du mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Méthode pour vérifier les permissions
userSchema.methods.hasPermission = function(permission) {
  if (this.role === 'admin') return true;
  return this.permissions.includes(permission);
};

// Méthode pour obtenir le nom complet
userSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

// Méthode pour définir les permissions par défaut selon le rôle
userSchema.methods.setDefaultPermissions = function() {
  switch (this.role) {
    case 'admin':
      this.permissions = [
        'read_furniture', 'write_furniture', 'delete_furniture',
        'read_materials', 'write_materials', 'delete_materials',
        'read_suppliers', 'write_suppliers', 'delete_suppliers',
        'read_users', 'write_users', 'delete_users',
        'admin_dashboard'
      ];
      break;
    case 'manager':
      this.permissions = [
        'read_furniture', 'write_furniture',
        'read_materials', 'write_materials',
        'read_suppliers', 'write_suppliers',
        'read_users'
      ];
      break;
    case 'user':
      this.permissions = [
        'read_furniture',
        'read_materials',
        'read_suppliers'
      ];
      break;
  }
};

module.exports = mongoose.model('User', userSchema);
