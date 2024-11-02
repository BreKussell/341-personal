const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    username: { type: String, required: true },
    type: { type: String, required: true },
    goal: { type: String, required: true },
    achieved: { type: String },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Workout', workoutSchema);
