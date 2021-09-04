const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
    
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/logout', authController.logoutUser);

module.exports = router;