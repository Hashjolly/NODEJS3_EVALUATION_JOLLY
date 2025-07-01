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

// Recherche par mot-clé - DOIT être avant /:id
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

// Formulaire de création - DOIT être avant /:id
router.get('/new', async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.render('materials/new', {
      title: 'Nouveau Matériau',
      suppliers
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors du chargement du formulaire'
    });
  }
});

// Affichage d'un matériau
router.get('/:id', async (req, res) => {
  try {
    // Vérifier si l'ID est un ObjectId valide
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).render('error', {
        title: 'Matériau non trouvé',
        message: 'L\'identifiant du matériau n\'est pas valide'
      });
    }

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

// Création d'un matériau
router.post('/', async (req, res) => {
  try {
    const { name, category, type, supplier, unitPrice, unit, description, keywords } = req.body;
    
    // Validation des données
    if (!name || !category || !type || !supplier) {
      const suppliers = await Supplier.find().sort({ name: 1 });
      return res.render('materials/new', {
        title: 'Nouveau Matériau',
        suppliers,
        error: 'Le nom, la catégorie, le type et le fournisseur sont obligatoires',
        formData: req.body
      });
    }

    const material = new Material({
      name,
      category,
      type,
      supplier,
      unitPrice: parseFloat(unitPrice) || 0,
      unit: unit || 'kg',
      description,
      keywords: keywords ? keywords.split(',').map(k => k.trim()) : []
    });

    await material.save();
    res.redirect(`/materials/${material._id}?success=Matériau créé avec succès`);
  } catch (error) {
    console.error(error);
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.render('materials/new', {
      title: 'Nouveau Matériau',
      suppliers,
      error: 'Erreur lors de la création du matériau',
      formData: req.body
    });
  }
});

// Formulaire d'édition
router.get('/:id/edit', async (req, res) => {
  try {
    // Vérifier si l'ID est un ObjectId valide
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).render('error', {
        title: 'Matériau non trouvé',
        message: 'L\'identifiant du matériau n\'est pas valide'
      });
    }

    const material = await Material.findById(req.params.id).populate('supplier');
    const suppliers = await Supplier.find().sort({ name: 1 });

    if (!material) {
      return res.status(404).render('error', {
        title: 'Matériau non trouvé',
        message: 'Le matériau demandé n\'existe pas'
      });
    }

    res.render('materials/edit', {
      title: `Modifier ${material.name}`,
      material,
      suppliers
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors du chargement du formulaire d\'édition'
    });
  }
});

// Mise à jour d'un matériau
router.put('/:id', async (req, res) => {
  try {
    // Vérifier si l'ID est un ObjectId valide
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).render('error', {
        title: 'Matériau non trouvé',
        message: 'L\'identifiant du matériau n\'est pas valide'
      });
    }

    const { name, category, type, supplier, unitPrice, unit, description, keywords } = req.body;
    
    // Validation des données
    if (!name || !category || !type || !supplier) {
      const material = await Material.findById(req.params.id).populate('supplier');
      const suppliers = await Supplier.find().sort({ name: 1 });
      return res.render('materials/edit', {
        title: `Modifier ${material.name}`,
        material,
        suppliers,
        error: 'Le nom, la catégorie, le type et le fournisseur sont obligatoires'
      });
    }

    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).render('error', {
        title: 'Matériau non trouvé',
        message: 'Le matériau demandé n\'existe pas'
      });
    }

    material.name = name;
    material.category = category;
    material.type = type;
    material.supplier = supplier;
    material.unitPrice = parseFloat(unitPrice) || 0;
    material.unit = unit || 'kg';
    material.description = description;
    material.keywords = keywords ? keywords.split(',').map(k => k.trim()) : [];

    await material.save();
    res.redirect(`/materials/${material._id}?success=Matériau modifié avec succès`);
  } catch (error) {
    console.error(error);
    const material = await Material.findById(req.params.id).populate('supplier');
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.render('materials/edit', {
      title: `Modifier ${material.name}`,
      material,
      suppliers,
      error: 'Erreur lors de la modification du matériau'
    });
  }
});

// Suppression d'un matériau
router.delete('/:id', async (req, res) => {
  try {
    // Vérifier si l'ID est un ObjectId valide
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ 
        success: false, 
        message: 'L\'identifiant du matériau n\'est pas valide' 
      });
    }

    const material = await Material.findById(req.params.id);
    
    if (!material) {
      return res.status(404).json({ 
        success: false, 
        message: 'Matériau non trouvé' 
      });
    }

    // Vérifier si le matériau est utilisé dans des meubles
    const furnitureCount = await Furniture.countDocuments({
      'materials.material': material._id
    });

    if (furnitureCount > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Impossible de supprimer ce matériau car il est utilisé dans ${furnitureCount} meuble(s)` 
      });
    }

    await Material.findByIdAndDelete(req.params.id);
    
    res.json({ 
      success: true, 
      message: 'Matériau supprimé avec succès' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la suppression du matériau' 
    });
  }
});

module.exports = router;
