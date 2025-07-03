const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Bois', 'Fer', 'Plastique']
  },
  type: {
    type: String,
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  unitPrice: {
    type: Number,
    default: 0
  },
  unit: {
    type: String,
    default: 'kg'
  },
  description: String,
  keywords: [String]
}, {
  timestamps: true
});

// Index pour la recherche
materialSchema.index({ name: 'text', keywords: 'text', description: 'text' });

module.exports = mongoose.model('Material', materialSchema);
