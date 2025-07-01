const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Armoire', 'Etagère']
  },
  description: String,
  materials: [{
    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    unit: String
  }],
  totalCost: {
    type: Number,
    default: 0
  },
  designDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Conception', 'En production', 'Terminé', 'Livré'],
    default: 'Conception'
  },
  keywords: [String],
  notes: String
}, {
  timestamps: true
});

// Méthode pour calculer le coût total
furnitureSchema.methods.calculateTotalCost = async function() {
  await this.populate('materials.material');
  let total = 0;
  this.materials.forEach(item => {
    total += item.quantity * (item.material.unitPrice || 0);
  });
  this.totalCost = total;
  return total;
};

// Index pour la recherche
furnitureSchema.index({ name: 'text', keywords: 'text', description: 'text' });

module.exports = mongoose.model('Furniture', furnitureSchema);
