const express = require('express');
const router = express.Router();
const Furniture = require('../models/Furniture');
const Material = require('../models/Material');
const Supplier = require('../models/Supplier');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(requireAuth);

// Tableau de bord principal
router.get('/', async (req, res) => {
  try {
    // Statistiques générales
    const totalFurniture = await Furniture.countDocuments();
    const totalMaterials = await Material.countDocuments();
    const totalSuppliers = await Supplier.countDocuments();
    const totalUsers = await User.countDocuments();

    // Statistiques utilisateurs (pour les admins)
    let userStats = null;
    if (req.session.user.role === 'admin' || (req.session.user.permissions && req.session.user.permissions.includes('read_users'))) {
      userStats = {
        total: totalUsers,
        active: await User.countDocuments({ isActive: true }),
        inactive: await User.countDocuments({ isActive: false }),
        admins: await User.countDocuments({ role: 'admin' }),
        managers: await User.countDocuments({ role: 'manager' }),
        users: await User.countDocuments({ role: 'user' }),
        recentUsers: await User.find({ isActive: true })
          .select('-password')
          .sort({ lastLogin: -1 })
          .limit(5)
      };
    }

    // Répartition par catégorie de meubles
    const furnitureByCategory = await Furniture.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Répartition par statut
    const furnitureByStatus = await Furniture.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Matériaux les plus utilisés
    const materialUsage = await Furniture.aggregate([
      { $unwind: '$materials' },
      { $group: { 
        _id: '$materials.material', 
        totalQuantity: { $sum: '$materials.quantity' },
        usageCount: { $sum: 1 }
      }},
      { $sort: { usageCount: -1 } },
      { $limit: 10 },
      { $lookup: {
        from: 'materials',
        localField: '_id',
        foreignField: '_id',
        as: 'material'
      }},
      { $unwind: '$material' }
    ]);

    // Coût total des productions
    const totalCost = await Furniture.aggregate([
      { $group: { _id: null, total: { $sum: '$totalCost' } } }
    ]);

    // Meubles récents
    const recentFurniture = await Furniture.find()
      .populate('materials.material')
      .sort({ createdAt: -1 })
      .limit(5);

    res.render('dashboard/index', {
      title: 'Tableau de Bord',
      stats: {
        totalFurniture,
        totalMaterials,
        totalSuppliers,
        totalUsers,
        totalCost: totalCost[0]?.total || 0
      },
      furnitureByCategory,
      furnitureByStatus,
      materialUsage,
      recentFurniture,
      userStats
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors du chargement du tableau de bord'
    });
  }
});

// API pour les graphiques
router.get('/api/stats', async (req, res) => {
  try {
    const furnitureByCategory = await Furniture.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const furnitureByStatus = await Furniture.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const materialsByCategory = await Material.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.json({
      furnitureByCategory,
      furnitureByStatus,
      materialsByCategory
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
});

module.exports = router;
