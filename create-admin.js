const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Connexion à la base de données
async function initializeAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connexion à MongoDB réussie');

    // Vérifier si un administrateur existe déjà
    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('Un administrateur existe déjà:', existingAdmin.username);
      process.exit(0);
    }

    // Créer un administrateur par défaut
    const admin = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      firstName: 'Administrateur',
      lastName: 'Système',
      role: 'admin'
    });

    // Définir les permissions d'admin
    admin.setDefaultPermissions();
    
    await admin.save();
    
    console.log('✅ Administrateur créé avec succès!');
    console.log('Nom d\'utilisateur: admin');
    console.log('Email: admin@example.com');
    console.log('Mot de passe: admin123');
    console.log('⚠️  IMPORTANT: Changez le mot de passe après la première connexion!');
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'administrateur:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

// Créer quelques utilisateurs de test
async function createTestUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connexion à MongoDB réussie');

    // Créer un manager de test
    const manager = new User({
      username: 'manager',
      email: 'manager@example.com',
      password: 'manager123',
      firstName: 'Jean',
      lastName: 'Manager',
      role: 'manager'
    });
    manager.setDefaultPermissions();

    // Créer un utilisateur standard
    const user = new User({
      username: 'user',
      email: 'user@example.com',
      password: 'user123',
      firstName: 'Marie',
      lastName: 'Utilisateur',
      role: 'user'
    });
    user.setDefaultPermissions();

    // Vérifier s'ils existent déjà
    const existingManager = await User.findOne({ username: 'manager' });
    const existingUser = await User.findOne({ username: 'user' });

    if (!existingManager) {
      await manager.save();
      console.log('✅ Manager de test créé: manager / manager123');
    }

    if (!existingUser) {
      await user.save();
      console.log('✅ Utilisateur de test créé: user / user123');
    }

  } catch (error) {
    console.error('❌ Erreur lors de la création des utilisateurs de test:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

// Vérifier les arguments de ligne de commande
const args = process.argv.slice(2);

if (args.includes('--test-users')) {
  createTestUsers();
} else {
  initializeAdmin();
}
