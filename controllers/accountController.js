const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = { username: user.username };
            res.status(200).render('dashboard', { message: `Welcome ${username}!`, user });
        } else {
            res.status(401).render('login', { message: 'Invalid username or password!' });
        }
    } catch (error) {
        res.status(500).render('login', { message: 'An error occurred. Please try again.' });
    }
};

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).render('login', { message: 'Registration successful! Please log in.' });
    } catch (error) {
        res.status(500).render('register', { message: 'Username already taken or other error.' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
