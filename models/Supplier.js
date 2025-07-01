const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  contact: {
    email: String,
    phone: String,
    address: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Supplier', supplierSchema);
