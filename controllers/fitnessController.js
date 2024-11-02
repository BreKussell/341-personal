const fs = require('fs');
const path = './data/data.json';

// Display the "Add New Workout" form
exports.showNewWorkoutForm = (req, res) => {
    res.render('newWorkout');
};

// Handle form submission to add a new workout and redirect to dashboard
exports.addWorkout = (req, res) => {
    const { type, goal, achieved, date } = req.body;
    const username = req.session.user.username;

    // Read and parse the JSON file
    const data = JSON.parse(fs.readFileSync(path));

    // Create new workout entry
    const newWorkout = { type, goal, achieved, date };

    // Ensure the user's workouts array exists
    if (!data.fitness[username]) {
        data.fitness[username] = [];
    }

    // Add the new workout to the user's array
    data.fitness[username].push(newWorkout);

    // Write updated data back to the JSON file
    fs.writeFileSync(path, JSON.stringify(data, null, 2));

    // Fetch the updated workouts for the user
    const updatedWorkouts = data.fitness[username];

    // Render the dashboard view with updated workouts
    res.render('dashboard', { message: `Workout added successfully, ${username}!`, workouts: updatedWorkouts, user: { username } });
};

// Display the "Delete Workout" page with current workouts
exports.showDeleteWorkoutPage = (req, res) => {
    const username = req.session.user.username;

    // Read and parse the JSON file
    const data = JSON.parse(fs.readFileSync(path));

    // Get the user's workouts
    const workouts = data.fitness[username] || [];

    res.render('deleteWorkout', { workouts });
};

// Handle the deletion of a workout
exports.deleteWorkout = (req, res) => {
    const username = req.session.user.username;
    const { workoutIndex } = req.body; // Index of the workout to delete

    // Read and parse the JSON file
    const data = JSON.parse(fs.readFileSync(path));

    // Ensure the user's workouts array exists
    if (data.fitness[username]) {
        // Remove the workout by index
        data.fitness[username].splice(workoutIndex, 1);

        // Save the updated data back to the JSON file
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
    }

    // Fetch the updated workouts for the user
    const updatedWorkouts = data.fitness[username] || [];

    // Render the dashboard view with updated workouts
    res.render('dashboard', { message: `Workout deleted successfully, ${username}!`, workouts: updatedWorkouts, user: { username } });
};

// Display the "Update Goal" form with current workouts
exports.showUpdateGoalForm = (req, res) => {
    const username = req.session.user.username;

    // Read and parse the JSON file
    const data = JSON.parse(fs.readFileSync(path));

    // Retrieve the user's workouts
    const workouts = data.fitness[username] || [];

    // Render the updateGoal view with the workouts data
    res.render('updateGoal', { workouts });
};

// Handle the update of a workout with all properties
exports.updateGoal = (req, res) => {
    const { workoutIndex, type, goal, achieved, date } = req.body;
    const username = req.session.user.username;

    // Read and parse the JSON file
    const data = JSON.parse(fs.readFileSync(path));

    // Ensure the workout exists and update each property
    const userWorkouts = data.fitness[username];
    if (userWorkouts && userWorkouts[workoutIndex]) {
        userWorkouts[workoutIndex].type = type;
        userWorkouts[workoutIndex].goal = goal;
        userWorkouts[workoutIndex].achieved = achieved;
        userWorkouts[workoutIndex].date = date;

        // Write updated data back to the JSON file
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
    }

    // Render the dashboard view with updated workouts
    res.render('dashboard', { message: `Workout updated successfully!`, workouts: userWorkouts, user: { username } });
};
