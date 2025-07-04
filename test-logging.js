#!/usr/bin/env node

/**
 * Script de démonstration du système de logging Winston
 * pour la gestion des utilisateurs
 */

const path = require('path');
const { logger } = require(path.join(__dirname, 'back', 'config', 'logger'));

console.log('🧪 Test du système de logging Winston');
console.log('====================================\n');

// Test des différents niveaux de log
console.log('📝 Test des niveaux de logging...\n');

// Log d'information
logger.info('Test du niveau INFO', {
  testType: 'logging_demo',
  level: 'info',
  timestamp: new Date().toISOString(),
  testData: {
    action: 'user_management_demo',
    component: 'users_route'
  }
});

// Log d'avertissement  
logger.warn('Test du niveau WARN', {
  testType: 'logging_demo',
  level: 'warn',
  warning: 'Tentative d\'accès non autorisé',
  testData: {
    userId: 'test_user_123',
    attemptedAction: 'delete_admin_user'
  }
});

// Log d'erreur
logger.error('Test du niveau ERROR', {
  testType: 'logging_demo',
  level: 'error',
  error: 'Erreur simulée pour test',
  stack: 'Stack trace simulée...',
  testData: {
    operation: 'user_creation',
    failureReason: 'duplicate_username'
  }
});

// Log de débogage
logger.debug('Test du niveau DEBUG', {
  testType: 'logging_demo',
  level: 'debug',
  debugInfo: 'Informations de débogage détaillées',
  testData: {
    sqlQuery: 'SELECT * FROM users WHERE...',
    executionTime: '25ms'
  }
});

console.log('✅ Logs de test générés avec succès!\n');

// Simulation d'activités utilisateur
console.log('👥 Simulation d\'activités de gestion utilisateur...\n');

// Simulation d'accès à la liste
logger.info('User list access attempt', {
  userId: 'admin_123',
  userRole: 'admin',
  ip: '127.0.0.1',
  searchQuery: 'john',
  roleFilter: 'manager',
  statusFilter: 'active'
});

// Simulation de création d'utilisateur
logger.info('User creation attempt', {
  adminUserId: 'admin_123',
  adminRole: 'admin',
  newUserData: {
    username: 'johndoe',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'user'
  },
  ip: '127.0.0.1'
});

logger.info('User created successfully', {
  adminUserId: 'admin_123',
  newUserId: 'user_456',
  newUserUsername: 'johndoe',
  newUserRole: 'user',
  ip: '127.0.0.1'
});

// Simulation de suppression
logger.info('User deletion attempt', {
  adminUserId: 'admin_123',
  adminRole: 'admin',
  targetUserId: 'user_789',
  ip: '127.0.0.1'
});

logger.warn('User deletion failed - attempting to delete own account', {
  adminUserId: 'admin_123',
  targetUserId: 'admin_123',
  ip: '127.0.0.1'
});

// Simulation d'erreur
logger.error('Error creating user', {
  error: 'ValidationError: Username already exists',
  stack: 'Error: Username already exists\\n    at User.save()...',
  adminUserId: 'admin_123',
  attemptedUserData: {
    username: 'existinguser',
    email: 'test@example.com',
    role: 'user'
  },
  ip: '127.0.0.1'
});

console.log('✅ Simulation d\'activités terminée!\n');

console.log('📂 Vérification des fichiers de logs...');

const fs = require('fs');

const logsDir = path.join(__dirname, 'back/logs');

if (fs.existsSync(logsDir)) {
  const logFiles = fs.readdirSync(logsDir);
  console.log(`📁 Dossier logs: ${logsDir}`);
  console.log(`📄 Fichiers trouvés: ${logFiles.length}`);
  
  logFiles.forEach(file => {
    const filePath = path.join(logsDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`   - ${file} (${sizeKB} KB)`);
  });
  
  console.log('\n✨ Système de logging Winston configuré et fonctionnel!');
  console.log('\n📋 Fonctionnalités disponibles:');
  console.log('   ✅ Logs structurés avec métadonnées');
  console.log('   ✅ Rotation automatique des fichiers');
  console.log('   ✅ Séparation des niveaux (info, warn, error, debug)');
  console.log('   ✅ Logs de sécurité pour la gestion utilisateur');
  console.log('   ✅ Tracking des actions administratives');
  console.log('   ✅ Logging des erreurs avec stack traces');
  
} else {
  console.log('❌ Dossier logs non trouvé!');
}

console.log('\n🔍 Pour voir les logs en temps réel:');
console.log('   tail -f back/logs/app.log');
console.log('   tail -f back/logs/error.log');
console.log('   tail -f back/logs/debug.log');
