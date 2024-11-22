const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  basePrice: { 
    unit: { type: String, enum: ['kg', 'mt'], required: true },
    value: { type: Number },
  }, // Optional base price for products without types
  types: [
    {
      typeName: { type: String, required: true },
      price: {
        unit: { type: String, enum: ['kg', 'mt'], required: true },
        value: { type: Number, required: true },
      },
    },
  ],
});

module.exports = mongoose.model('Product', ProductSchema);
