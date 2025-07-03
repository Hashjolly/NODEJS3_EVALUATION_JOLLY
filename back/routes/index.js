const express = require('express');
const router = express.Router();
const Furniture = require('../models/Furniture');
const Material = require('../models/Material');
const Supplier = require('../models/Supplier');

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
    // Recherche dans les meubles
    const furniture = await Furniture.find({
      $or: [
        { name: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { category: new RegExp(q, 'i') },
        { notes: new RegExp(q, 'i') },
        { keywords: { $in: [new RegExp(q, 'i')] } }
      ]
    }).populate('materials.material').limit(10);

    // Recherche dans les matériaux
    const materials = await Material.find({
      $or: [
        { name: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { category: new RegExp(q, 'i') },
        { type: new RegExp(q, 'i') },
        { keywords: { $in: [new RegExp(q, 'i')] } }
      ]
    }).populate('supplier').limit(10);

    // Recherche dans les fournisseurs
    const suppliers = await Supplier.find({
      $or: [
        { name: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { 'contact.email': new RegExp(q, 'i') },
        { 'contact.phone': new RegExp(q, 'i') },
        { 'contact.address': new RegExp(q, 'i') }
      ]
    }).limit(10);

    res.render('search', {
      title: `Résultats pour "${q}"`,
      query: q,
      furniture,
      materials,
      suppliers
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
