const fs = require('fs');
const path = './data/data.json';

// Login function
exports.login = (req, res) => {
    const { username, password } = req.body;

    // Read and parse the JSON file
    const data = JSON.parse(fs.readFileSync(path));

    // Find the user by username
    const user = data.users.find(user => user.username === username);

    // Directly compare plain text password
    if (user && user.password === password) {
        req.session.user = { username: user.username };

        // Retrieve the user's workouts if they exist in the fitness data
        const workouts = data.fitness[username] || [];

        // Pass workouts, user data, and darkMode preference to the dashboard view
        return res.status(200).render('dashboard', { 
            message: `Welcome ${username}!`, 
            workouts, 
            user: { username }, 
            darkMode: user.darkMode || false // Default to false if not set
        });
    }

    // If user not found or password doesn't match
    res.status(401).render('login', { message: 'Get thee hence Hacker!' });
};

// Register function with placeholder goal and dark mode default
exports.register = (req, res) => {
    const { username, password } = req.body;

    // Read and parse the JSON file
    const data = JSON.parse(fs.readFileSync(path));

    // Check if username already exists
    const userExists = data.users.some(user => user.username === username);
    if (userExists) {
        return res.render('register', { message: 'Username already exists. Please choose another.' });
    }

    // Add the new user to the 'users' array with plain-text password and darkMode default to false
    const newUser = { username, password, darkMode: false };
    data.users.push(newUser);

    // Add a placeholder workout for the new user
    data.fitness[username] = [{ type: "placeholder", goal: "placeholder", achieved: "placeholder", date: "placeholder" }];

    // Write the updated data back to the JSON file
    fs.writeFileSync(path, JSON.stringify(data, null, 2));

    // Redirect to login page with a success message
    res.status(201).render('login', { message: 'Registration successful! Please log in.' });
};

// Toggle dark mode function
exports.toggleDarkMode = (req, res) => {
    const username = req.session.user.username;

    // Read and parse the JSON file
    const data = JSON.parse(fs.readFileSync(path));

    // Find the user and toggle dark mode setting
    const user = data.users.find(user => user.username === username);
    user.darkMode = !user.darkMode;  // Toggle between true and false

    // Write updated data back to the JSON file
    fs.writeFileSync(path, JSON.stringify(data, null, 2));

    // Redirect to the dashboard with updated setting
    res.redirect('/account/dashboard');
};

// Logout function
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');  // Redirect to the root route, which renders login.ejs
    });
};
