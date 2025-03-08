const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3, // Minimum length for username
        trim: true, // Trim whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
        minLength: 6,
    },
    userClass: {
        type: String,
        enum: ['Admin', 'Regular User'], // Role-based user classification
        default: 'Regular User', // Default to Regular User
    },
    registrationDate: {
        type: Date,
        default: Date.now, // Default registration date
    },
});

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = {
    User
};