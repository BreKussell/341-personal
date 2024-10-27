const bcrypt = require('bcrypt');

// Utility to hash a password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Utility to validate a password against a hashed password
const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Utility to calculate calories burned based on MET (Metabolic Equivalent of Task)
// MET values vary based on activity type 
const calculateCaloriesBurned = (weight, duration, MET) => {
  // Formula: Calories = MET * weight (kg) * duration (hours)
  return MET * weight * (duration / 60);
};

// Utility to format a date to a readable string 
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

// Utility to validate workout type
const isValidWorkoutType = (type) => {
  const workoutTypes = ['MAKE A LIST'];
  return workoutTypes.includes(type);
};

// Utility to validate exercise category
const isValidExerciseCategory = (category) => {
  const categories = ['Strength', 'Cardio', 'Flexibility', 'Balance'];
  return categories.includes(category);
};

// Export all utilities
module.exports = {
  hashPassword,
  validatePassword,
  calculateCaloriesBurned,
  formatDate,
  isValidWorkoutType,
  isValidExerciseCategory
};
