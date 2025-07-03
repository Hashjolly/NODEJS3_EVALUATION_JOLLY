const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function migrateUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connexion à MongoDB réussie');

    // Trouver tous les utilisateurs existants
    const users = await User.find({});
    
    console.log(`Trouvé ${users.length} utilisateur(s) à migrer`);

    for (const user of users) {
      let updated = false;

      // Ajouter les nouveaux champs s'ils n'existent pas
      if (!user.email) {
        user.email = `${user.username}@example.com`;
        updated = true;
      }

      if (!user.firstName) {
        user.firstName = 'Prénom';
        updated = true;
      }

      if (!user.lastName) {
        user.lastName = 'Nom';
        updated = true;
      }

      if (!user.permissions || user.permissions.length === 0) {
        user.setDefaultPermissions();
        updated = true;
      }

      if (user.isActive === undefined) {
        user.isActive = true;
        updated = true;
      }

      if (updated) {
        await user.save();
        console.log(`✅ Utilisateur ${user.username} mis à jour`);
      } else {
        console.log(`⏭️  Utilisateur ${user.username} déjà à jour`);
      }
    }

    console.log('✅ Migration terminée avec succès!');

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

migrateUsers();
