const express = require('express');
const router = express.Router();
const Furniture = require('../models/Furniture');
const Material = require('../models/Material');
const Supplier = require('../models/Supplier');

// Routes pour les meubles
router.get('/furniture', async (req, res) => {
  try {
    const furniture = await Furniture.find().populate('materials.material');
    res.json(furniture);
  } catch (error) {
    console.error('Error fetching furniture:', error);
    res.status(500).json({ error: 'Erreur lors du chargement des meubles' });
  }
});

router.get('/furniture/:id', async (req, res) => {
  try {
    const furniture = await Furniture.findById(req.params.id).populate('materials.material');
    if (!furniture) {
      return res.status(404).json({ error: 'Meuble non trouvé' });
    }
    res.json(furniture);
  } catch (error) {
    console.error('Error fetching furniture:', error);
    res.status(500).json({ error: 'Erreur lors du chargement du meuble' });
  }
});

// Routes pour les matériaux
router.get('/materials', async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (error) {
    console.error('Error fetching materials:', error);
    res.status(500).json({ error: 'Erreur lors du chargement des matériaux' });
  }
});

router.get('/materials/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ error: 'Matériau non trouvé' });
    }
    res.json(material);
  } catch (error) {
    console.error('Error fetching material:', error);
    res.status(500).json({ error: 'Erreur lors du chargement du matériau' });
  }
});

// Routes pour les fournisseurs
router.get('/suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ error: 'Erreur lors du chargement des fournisseurs' });
  }
});

router.get('/suppliers/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: 'Fournisseur non trouvé' });
    }
    res.json(supplier);
  } catch (error) {
    console.error('Error fetching supplier:', error);
    res.status(500).json({ error: 'Erreur lors du chargement du fournisseur' });
  }
});

// Route de recherche globale
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Paramètre de recherche requis' });
    }

    const searchRegex = new RegExp(q, 'i');
    
    const [furniture, materials, suppliers] = await Promise.all([
      Furniture.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { category: searchRegex }
        ]
      }).populate('materials suppliers'),
      Material.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { type: searchRegex }
        ]
      }),
      Supplier.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { location: searchRegex }
        ]
      })
    ]);

    res.json({
      furniture,
      materials,
      suppliers,
      total: furniture.length + materials.length + suppliers.length
    });
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'Erreur lors de la recherche' });
  }
});

module.exports = router;
