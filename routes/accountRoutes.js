const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const fs = require('fs'); // Required to read data in the dashboard route
const path = '../data/data.json'; 

// Toggle dark mode
router.post('/toggle-dark-mode', accountController.toggleDarkMode);

// Render the dashboard view
router.get('/dashboard', (req, res) => {
    const { username } = req.session.user;

    // Read data from JSON file
    const data = JSON.parse(fs.readFileSync(path));
    const user = data.users.find(user => user.username === username);
    const workouts = data.fitness[username] || [];

    // Render the dashboard with dark mode setting and workouts
    res.render('dashboard', { message: `Welcome ${username}!`, workouts, user, darkMode: user.darkMode });
});

// Login and Register Routes
router.get('/login', (req, res) => res.render('login'));
router.post('/login', accountController.login);
router.get('/register', (req, res) => res.render('register'));
router.post('/register', accountController.register);
router.get('/logout', accountController.logout);

module.exports = router;
