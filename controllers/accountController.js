const passport = require('passport');

// Render login page
exports.renderLoginPage = (req, res) => {
  res.render('login', { message: req.flash('error') });
};

// Handle login
exports.handleLogin = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true,
});

// Handle logout
exports.handleLogout = (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
};
