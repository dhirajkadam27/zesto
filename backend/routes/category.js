const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Create Category
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Categories
router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

module.exports = router;
