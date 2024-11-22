const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create Product
router.post('/', async (req, res) => {
  try {
    const productData = req.body;

    if (!productData.basePrice && (!productData.types || productData.types.length === 0)) {
      return res.status(400).json({ error: 'Either base price or types must be provided.' });
    }

    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



// Get Products by Category
router.get('/:categoryId', async (req, res) => {
  const products = await Product.find({ category: req.params.categoryId });
  res.json(products);
});

// Get Products by Category
router.get('/id/:categoryId', async (req, res) => {
  const products = await Product.find({ _id: req.params.categoryId });
  res.json(products);
});


// Get Products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
