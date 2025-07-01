const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const Supplier = require('../models/Supplier');
const Furniture = require('../models/Furniture');
const { requireAuth } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(requireAuth);

// Liste des matériaux
router.get('/', async (req, res) => {
  try {
    const { category, supplier, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (supplier) query.supplier = supplier;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { type: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { keywords: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const materials = await Material.find(query)
      .populate('supplier')
      .sort({ category: 1, name: 1 });

    const suppliers = await Supplier.find().sort({ name: 1 });

    res.render('materials/index', {
      title: 'Gestion des Matériaux',
      materials,
      suppliers,
      category,
      supplier: supplier,
      search
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors du chargement des matériaux'
    });
  }
});

// Affichage d'un matériau
router.get('/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id).populate('supplier');
    if (!material) {
      return res.status(404).render('error', {
        title: 'Matériau non trouvé',
        message: 'Le matériau demandé n\'existe pas'
      });
    }

    // Trouver les meubles utilisant ce matériau
    const furniture = await Furniture.find({
      'materials.material': material._id
    }).select('name category status totalCost');

    res.render('materials/show', {
      title: material.name,
      material,
      furniture
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors du chargement du matériau'
    });
  }
});

// Recherche par mot-clé
router.get('/keyword/:keyword', async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const materials = await Material.find({
      keywords: { $in: [new RegExp(keyword, 'i')] }
    }).populate('supplier');

    res.render('materials/keyword', {
      title: `Matériaux - ${keyword}`,
      keyword,
      materials
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors de la recherche par mot-clé'
    });
  }
});

module.exports = router;
