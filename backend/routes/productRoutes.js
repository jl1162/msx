const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { createProduct, getProducts } = require('../controllers/productController');

router.route('/')
  .post(protect, admin, createProduct)
  .get(getProducts);

module.exports = router;