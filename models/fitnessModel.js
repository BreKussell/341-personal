const mongoose = require('mongoose');

// Workout Schema
const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  workoutType: {
    type: String,
    required: true,
    enum: ['MAKE A LIST'],
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  exercises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
  }],
});

// Exercise Schema
const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Strength', 'Cardio', 'Flexibility', 'Balance'],
  },
  sets: {
    type: Number,
    default: 1,
  },
  reps: {
    type: Number,
  },
  weight: {
    type: Number, // Weight for strength exercises
  },
  distance: {
    type: Number, // Distance for cardio exercises
  },
  duration: {
    type: Number, // Duration for cardio or flexibility exercises
  },
});

const Workout = mongoose.model('Workout', workoutSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = { Workout, Exercise };
