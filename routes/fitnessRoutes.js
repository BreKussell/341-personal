const express = require('express');
const router = express.Router();
const fitnessController = require('../controllers/fitnessController'); // Importing the controller

// Route to show the "Add New Workout" form
router.get('/new', fitnessController.showNewWorkoutForm);

// Route to handle form submission for adding a workout
router.post('/new', fitnessController.addWorkout);

// Route to show the "Delete Workout" page
router.get('/delete', fitnessController.showDeleteWorkoutPage);

// Route to handle deletion of a workout
router.post('/delete', fitnessController.deleteWorkout);

// Route to show the "Update Goal" form
router.get('/update', fitnessController.showUpdateGoalForm);

// Route to handle updating a workout goal
router.post('/update', fitnessController.updateGoal);

module.exports = router;
