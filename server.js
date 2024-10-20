const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Port is set as a variable, you can modify this
const PORT = process.env.PORT || 3000;

// Middleware to serve static files (like the login page)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data (for POST requests)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve login page on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple mock validation (replace with actual logic as needed)
  if (username === 'admin' && password === 'password') {
    res.send('Login successful');
  } else {
    res.send('Invalid credentials, please try again.');
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});