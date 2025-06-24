const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { getUsers, createUser } = require('../controllers/userController');

router.route('/')
  .get(protect, admin, getUsers)
  .post(protect, admin, createUser);

module.exports = router;