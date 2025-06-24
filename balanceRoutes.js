const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');
const authMiddleware = require('../middleware/authMiddleware');

router.put(
  '/:userId',
  authMiddleware.protect,
  authMiddleware.adminOnly,
  balanceController.updateBalance
);

module.exports = router;