const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');
const Material = require('../models/Material');
const { requireAuth } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(requireAuth);

// Liste des fournisseurs
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { 'contact.email': new RegExp(search, 'i') },
        { 'contact.phone': new RegExp(search, 'i') },
        { 'contact.address': new RegExp(search, 'i') }
      ];
    }

    const suppliers = await Supplier.find(query).sort({ name: 1 });

    res.render('suppliers/index', {
      title: 'Gestion des Fournisseurs',
      suppliers,
      search
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors du chargement des fournisseurs'
    });
  }
});

// Formulaire de création - DOIT être avant /:id
router.get('/new', async (req, res) => {
  try {
    res.render('suppliers/new', {
      title: 'Nouveau Fournisseur'
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors du chargement du formulaire'
    });
  }
});

// Affichage d'un fournisseur
router.get('/:id', async (req, res) => {
  try {
    // Vérifier si l'ID est un ObjectId valide
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).render('error', {
        title: 'Fournisseur non trouvé',
        message: 'L\'identifiant du fournisseur n\'est pas valide'
      });
    }

    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).render('error', {
        title: 'Fournisseur non trouvé',
        message: 'Le fournisseur demandé n\'existe pas'
      });
    }

    // Trouver les matériaux fournis par ce fournisseur
    const materials = await Material.find({
      supplier: supplier._id
    }).select('name category type unitPrice unit');

    res.render('suppliers/show', {
      title: supplier.name,
      supplier,
      materials
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors du chargement du fournisseur'
    });
  }
});

// Création d'un fournisseur
router.post('/', async (req, res) => {
  try {
    const { name, description, email, phone, address } = req.body;
    
    // Validation des données
    if (!name) {
      return res.render('suppliers/new', {
        title: 'Nouveau Fournisseur',
        error: 'Le nom du fournisseur est obligatoire',
        formData: req.body
      });
    }

    const supplier = new Supplier({
      name,
      description,
      contact: {
        email: email || undefined,
        phone: phone || undefined,
        address: address || undefined
      }
    });

    await supplier.save();
    res.redirect(`/suppliers/${supplier._id}?success=Fournisseur créé avec succès`);
  } catch (error) {
    console.error(error);
    let errorMessage = 'Erreur lors de la création du fournisseur';
    
    // Gestion de l'erreur de nom unique
    if (error.code === 11000) {
      errorMessage = 'Un fournisseur avec ce nom existe déjà';
    }

    res.render('suppliers/new', {
      title: 'Nouveau Fournisseur',
      error: errorMessage,
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
        title: 'Fournisseur non trouvé',
        message: 'L\'identifiant du fournisseur n\'est pas valide'
      });
    }

    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).render('error', {
        title: 'Fournisseur non trouvé',
        message: 'Le fournisseur demandé n\'existe pas'
      });
    }

    res.render('suppliers/edit', {
      title: `Modifier ${supplier.name}`,
      supplier
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors du chargement du formulaire d\'édition'
    });
  }
});

// Mise à jour d'un fournisseur
router.put('/:id', async (req, res) => {
  try {
    // Vérifier si l'ID est un ObjectId valide
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).render('error', {
        title: 'Fournisseur non trouvé',
        message: 'L\'identifiant du fournisseur n\'est pas valide'
      });
    }

    const { name, description, email, phone, address } = req.body;
    
    // Validation des données
    if (!name) {
      const supplier = await Supplier.findById(req.params.id);
      return res.render('suppliers/edit', {
        title: `Modifier ${supplier.name}`,
        supplier,
        error: 'Le nom du fournisseur est obligatoire'
      });
    }

    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).render('error', {
        title: 'Fournisseur non trouvé',
        message: 'Le fournisseur demandé n\'existe pas'
      });
    }

    supplier.name = name;
    supplier.description = description;
    supplier.contact = {
      email: email || undefined,
      phone: phone || undefined,
      address: address || undefined
    };

    await supplier.save();
    res.redirect(`/suppliers/${supplier._id}?success=Fournisseur modifié avec succès`);
  } catch (error) {
    console.error(error);
    let errorMessage = 'Erreur lors de la modification du fournisseur';
    
    // Gestion de l'erreur de nom unique
    if (error.code === 11000) {
      errorMessage = 'Un fournisseur avec ce nom existe déjà';
    }

    const supplier = await Supplier.findById(req.params.id);
    res.render('suppliers/edit', {
      title: `Modifier ${supplier.name}`,
      supplier,
      error: errorMessage
    });
  }
});

// Suppression d'un fournisseur
router.delete('/:id', async (req, res) => {
  try {
    // Vérifier si l'ID est un ObjectId valide
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ 
        success: false, 
        message: 'L\'identifiant du fournisseur n\'est pas valide' 
      });
    }

    const supplier = await Supplier.findById(req.params.id);
    
    if (!supplier) {
      return res.status(404).json({ 
        success: false, 
        message: 'Fournisseur non trouvé' 
      });
    }

    // Vérifier si le fournisseur est utilisé dans des matériaux
    const materialCount = await Material.countDocuments({
      supplier: supplier._id
    });

    if (materialCount > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Impossible de supprimer ce fournisseur car il est associé à ${materialCount} matériau(x)` 
      });
    }

    await Supplier.findByIdAndDelete(req.params.id);
    
    res.json({ 
      success: true, 
      message: 'Fournisseur supprimé avec succès' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la suppression du fournisseur' 
    });
  }
});

module.exports = router;
