const express = require('express');
const router = express.Router();
const Furniture = require('../models/Furniture');
const Material = require('../models/Material');

// Page d'accueil
router.get('/', async (req, res) => {
  try {
    const furnitureCount = await Furniture.countDocuments();
    const materialCount = await Material.countDocuments();
    const recentFurniture = await Furniture.find()
      .populate('materials.material')
      .sort({ createdAt: -1 })
      .limit(6);

    res.render('index', {
      title: 'Accueil - Gestion des Meubles',
      furnitureCount,
      materialCount,
      recentFurniture
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors du chargement de la page d\'accueil'
    });
  }
});

// Recherche globale
router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.redirect('/');
  }

  try {
    const furniture = await Furniture.find({
      $text: { $search: q }
    }).populate('materials.material').limit(20);

    const materials = await Material.find({
      $text: { $search: q }
    }).populate('supplier').limit(20);

    res.render('search', {
      title: `Résultats pour "${q}"`,
      query: q,
      furniture,
      materials
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur de recherche',
      message: 'Erreur lors de la recherche'
    });
  }
});

module.exports = router;
