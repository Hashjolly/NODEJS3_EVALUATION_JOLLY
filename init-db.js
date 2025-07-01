const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import des modèles
const User = require('./models/User');
const Supplier = require('./models/Supplier');
const Material = require('./models/Material');
const Furniture = require('./models/Furniture');

// Connexion à la base de données
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connecté avec succès');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
};

// Fonction pour initialiser les données
const initData = async () => {
  try {
    // Supprimer toutes les données existantes
    await User.deleteMany({});
    await Supplier.deleteMany({});
    await Material.deleteMany({});
    await Furniture.deleteMany({});

    // Créer un utilisateur admin
    const adminUser = new User({
      username: 'admin',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Utilisateur admin créé');

    // Créer les fournisseurs
    const suppliers = [
      {
        name: 'BBois',
        description: 'Fournisseur spécialisé dans les bois de qualité',
        contact: {
          email: 'contact@bbois.fr',
          phone: '01 23 45 67 89',
          address: '123 Avenue du Bois, 75001 Paris'
        }
      },
      {
        name: 'MetaLo',
        description: 'Spécialiste des métaux pour l\'ameublement',
        contact: {
          email: 'info@metalo.fr',
          phone: '01 98 76 54 32',
          address: '456 Rue du Métal, 69001 Lyon'
        }
      },
      {
        name: 'pPlastique',
        description: 'Fournisseur de plastiques techniques',
        contact: {
          email: 'vente@pplastique.fr',
          phone: '04 56 78 90 12',
          address: '789 Boulevard Plastique, 13001 Marseille'
        }
      }
    ];

    const savedSuppliers = await Supplier.insertMany(suppliers);
    console.log('Fournisseurs créés');

    // Trouver les fournisseurs par nom
    const bBois = savedSuppliers.find(s => s.name === 'BBois');
    const metaLo = savedSuppliers.find(s => s.name === 'MetaLo');
    const pPlastique = savedSuppliers.find(s => s.name === 'pPlastique');

    // Créer les matériaux
    const materials = [
      // Bois
      {
        name: 'Frêne',
        category: 'Bois',
        type: 'Bois massif',
        supplier: bBois._id,
        unitPrice: 45.50,
        unit: 'kg',
        description: 'Bois de frêne de haute qualité, idéal pour les meubles robustes',
        keywords: ['bois', 'frêne', 'massif', 'résistant', 'naturel']
      },
      {
        name: 'Chêne',
        category: 'Bois',
        type: 'Bois massif',
        supplier: bBois._id,
        unitPrice: 52.75,
        unit: 'kg',
        description: 'Bois de chêne noble, parfait pour les meubles d\'exception',
        keywords: ['bois', 'chêne', 'noble', 'durable', 'classique']
      },
      {
        name: 'Noyer',
        category: 'Bois',
        type: 'Bois massif',
        supplier: bBois._id,
        unitPrice: 68.90,
        unit: 'kg',
        description: 'Bois de noyer précieux, apprécié pour sa couleur et ses veines',
        keywords: ['bois', 'noyer', 'précieux', 'veines', 'élégant']
      },
      // Métaux
      {
        name: 'Acier inoxydable',
        category: 'Fer',
        type: 'Métal',
        supplier: metaLo._id,
        unitPrice: 8.25,
        unit: 'kg',
        description: 'Acier inoxydable de qualité alimentaire, résistant à la corrosion',
        keywords: ['métal', 'acier', 'inox', 'résistant', 'moderne']
      },
      {
        name: 'Aluminium',
        category: 'Fer',
        type: 'Métal léger',
        supplier: metaLo._id,
        unitPrice: 12.40,
        unit: 'kg',
        description: 'Aluminium léger et résistant, idéal pour les structures modernes',
        keywords: ['métal', 'aluminium', 'léger', 'moderne', 'résistant']
      },
      // Plastique
      {
        name: 'Plastique technique',
        category: 'Plastique',
        type: 'Polymère',
        supplier: pPlastique._id,
        unitPrice: 15.60,
        unit: 'kg',
        description: 'Plastique technique haute performance pour applications spécialisées',
        keywords: ['plastique', 'technique', 'polymère', 'moderne', 'léger']
      }
    ];

    const savedMaterials = await Material.insertMany(materials);
    console.log('Matériaux créés');

    // Créer quelques meubles d'exemple
    const furniture = [
      {
        name: 'Armoire Chêne Classic',
        category: 'Armoire',
        description: 'Armoire traditionnelle en chêne massif avec finition naturelle',
        materials: [
          {
            material: savedMaterials.find(m => m.name === 'Chêne')._id,
            quantity: 45,
            unit: 'kg'
          },
          {
            material: savedMaterials.find(m => m.name === 'Acier inoxydable')._id,
            quantity: 2,
            unit: 'kg'
          }
        ],
        status: 'Terminé',
        keywords: ['armoire', 'chêne', 'classique', 'traditionnel'],
        notes: 'Finition huilée, poignées en acier brossé'
      },
      {
        name: 'Étagère Moderne Alu',
        category: 'Etagère',
        description: 'Étagère design avec structure aluminium et étagères en noyer',
        materials: [
          {
            material: savedMaterials.find(m => m.name === 'Noyer')._id,
            quantity: 12,
            unit: 'kg'
          },
          {
            material: savedMaterials.find(m => m.name === 'Aluminium')._id,
            quantity: 8,
            unit: 'kg'
          }
        ],
        status: 'En production',
        keywords: ['étagère', 'moderne', 'design', 'aluminium', 'noyer'],
        notes: 'Structure modulaire, montage sans vis apparentes'
      },
      {
        name: 'Armoire Eco-Design',
        category: 'Armoire',
        description: 'Armoire écologique combinant bois et plastique recyclé',
        materials: [
          {
            material: savedMaterials.find(m => m.name === 'Frêne')._id,
            quantity: 25,
            unit: 'kg'
          },
          {
            material: savedMaterials.find(m => m.name === 'Plastique technique')._id,
            quantity: 5,
            unit: 'kg'
          }
        ],
        status: 'Conception',
        keywords: ['armoire', 'écologique', 'recyclé', 'moderne'],
        notes: 'Design innovant respectueux de l\'environnement'
      }
    ];

    // Calculer les coûts et sauvegarder
    for (let furnitureData of furniture) {
      const newFurniture = new Furniture(furnitureData);
      await newFurniture.calculateTotalCost();
      await newFurniture.save();
    }

    console.log('Meubles d\'exemple créés');
    console.log('✅ Initialisation des données terminée avec succès !');
    
    // Afficher les informations de connexion
    console.log('\n🔐 Informations de connexion :');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('\n🌐 Démarrez l\'application avec: npm run dev');
    
  } catch (error) {
    console.error('Erreur lors de l\'initialisation:', error);
  } finally {
    await mongoose.connection.close();
  }
};

// Exécuter l'initialisation
const init = async () => {
  await connectDB();
  await initData();
};

init();
