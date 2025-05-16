require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

// Import routes
const accountRoutes = require('./routes/accountRoutes');
const fitnessRoutes = require('./routes/fitnessRoutes');

const app = express();
const PORT = 3000;

// Middleware for parsing JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.) from 'public' directory
app.use(express.static('public'));

// Set the view engine to EJS for rendering HTML templates
app.set('view engine', 'ejs');

// Configure session management with a session secret
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',  // Use a default if SESSION_SECRET is not set
    resave: false,
    saveUninitialized: true
}));

// Route for the root path, rendering the login page with an empty message by default
app.get('/', (req, res) => res.render('login', { message: '' }));

// Use account and fitness routes
app.use('/account', accountRoutes);   // Routes related to account actions (login, register, dark mode toggle)
app.use('/fitness', fitnessRoutes);   // Routes related to fitness tracking actions (add, update, delete workouts)

// Error handling for undefined routes (404 Not Found)
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
