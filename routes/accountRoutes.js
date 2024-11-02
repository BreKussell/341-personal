const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/login', (req, res) => res.render('login'));
router.post('/login', accountController.login);
router.get('/register', (req, res) => res.render('register'));
router.post('/register', accountController.register);
router.get('/logout', accountController.logout);  

module.exports = router;
