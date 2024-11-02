const Workout = require('../models/workout');

exports.showNewWorkoutForm = (req, res) => {
    res.render('newWorkout');
};

exports.addWorkout = async (req, res) => {
    const { type, goal, achieved, date } = req.body;
    const username = req.session.user.username;

    try {
        const newWorkout = new Workout({ username, type, goal, achieved, date });
        await newWorkout.save();

        const updatedWorkouts = await Workout.find({ username });
        res.render('dashboard', { message: `Workout added successfully, ${username}!`, workouts: updatedWorkouts, user: { username } });
    } catch (error) {
        res.status(500).render('dashboard', { message: 'Error adding workout.' });
    }
};

exports.showDeleteWorkoutPage = async (req, res) => {
    const username = req.session.user.username;
    const workouts = await Workout.find({ username });
    res.render('deleteWorkout', { workouts });
};

exports.deleteWorkout = async (req, res) => {
    const username = req.session.user.username;
    const { workoutId } = req.body;

    try {
        await Workout.findByIdAndDelete(workoutId);
        const updatedWorkouts = await Workout.find({ username });
        res.render('dashboard', { message: `Workout deleted successfully, ${username}!`, workouts: updatedWorkouts, user: { username } });
    } catch (error) {
        res.status(500).render('dashboard', { message: 'Error deleting workout.' });
    }
};

exports.showUpdateGoalForm = async (req, res) => {
    const username = req.session.user.username;
    const workouts = await Workout.find({ username });
    res.render('updateGoal', { workouts });
};

exports.updateGoal = async (req, res) => {
    const { workoutId, type, goal, achieved, date } = req.body;
    const username = req.session.user.username;

    try {
        await Workout.findByIdAndUpdate(workoutId, { type, goal, achieved, date });
        const updatedWorkouts = await Workout.find({ username });
        res.render('dashboard', { message: `Workout updated successfully!`, workouts: updatedWorkouts, user: { username } });
    } catch (error) {
        res.status(500).render('dashboard', { message: 'Error updating workout.' });
    }
};
