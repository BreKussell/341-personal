const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Login route
router.get('/login', accountController.renderLoginPage);

// Login POST route
router.post('/login', accountController.handleLogin);

// Logout route
router.get('/logout', accountController.handleLogout);

module.exports = router;
