
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // New controller

router.post('/login', adminController.login);
module.exports = router;
