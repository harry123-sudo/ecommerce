const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await db.Product.findAll();
    console.log("HARRY-->fetching all data");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new product
router.post('/products', async (req, res) => {
  try {
    console.log("HARRRYYYYYY"); 
    // delete req.body.id;
    console.log(req.body.products);
    req.body.products.id = Math.floor(Math.random() * 1000000000);
    console.log(req.body.products);
    const newProduct = await db.Product.create(req.body.products);
    console.log("HARRY-->adding  data :: ");
    console.log(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
