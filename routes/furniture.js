const express = require('express');
const router = express.Router();
const Furniture = require('../models/Furniture');
const Material = require('../models/Material');
const { requireAuth } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(requireAuth);

// Liste des meubles
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const { category, status, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { keywords: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const furniture = await Furniture.find(query)
      .populate('materials.material')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Furniture.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.render('furniture/index', {
      title: 'Gestion des Meubles',
      furniture,
      currentPage: page,
      totalPages,
      category,
      status,
      search
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors du chargement des meubles'
    });
  }
});

// Affichage d'un meuble
router.get('/:id', async (req, res) => {
  try {
    const furniture = await Furniture.findById(req.params.id)
      .populate('materials.material')
      .populate('materials.material.supplier');

    if (!furniture) {
      return res.status(404).render('error', {
        title: 'Meuble non trouvé',
        message: 'Le meuble demandé n\'existe pas'
      });
    }

    res.render('furniture/show', {
      title: furniture.name,
      furniture
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors du chargement du meuble'
    });
  }
});

// Formulaire de création
router.get('/new', async (req, res) => {
  try {
    const materials = await Material.find().populate('supplier');
    res.render('furniture/new', {
      title: 'Nouveau Meuble',
      materials
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors du chargement du formulaire'
    });
  }
});

// Création d'un meuble
router.post('/', async (req, res) => {
  try {
    const { name, category, description, materials, keywords, notes } = req.body;
    
    // Traitement des matériaux
    const furnitureMaterials = [];
    if (materials && Array.isArray(materials)) {
      materials.forEach(item => {
        if (item.material && item.quantity > 0) {
          furnitureMaterials.push({
            material: item.material,
            quantity: parseFloat(item.quantity),
            unit: item.unit || 'kg'
          });
        }
      });
    }

    const furniture = new Furniture({
      name,
      category,
      description,
      materials: furnitureMaterials,
      keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
      notes
    });

    await furniture.calculateTotalCost();
    await furniture.save();

    res.redirect(`/furniture/${furniture._id}`);
  } catch (error) {
    console.error(error);
    const materials = await Material.find().populate('supplier');
    res.render('furniture/new', {
      title: 'Nouveau Meuble',
      materials,
      error: 'Erreur lors de la création du meuble',
      formData: req.body
    });
  }
});

module.exports = router;
