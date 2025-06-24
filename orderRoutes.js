const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { createOrder, getOrders } = require('../controllers/orderController');

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getOrders);

module.exports = router;