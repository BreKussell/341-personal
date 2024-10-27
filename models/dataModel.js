const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fitnessGoals: {
    type: String,
    default: 'Set your fitness goals here',
  },
  activityHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
  }]
});

// Password hashing middleware
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

// Password validation method
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
