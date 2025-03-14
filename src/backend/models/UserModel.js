const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        trim: true,
        lowercase: true // Ensures case-insensitive
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: v => /\S+@\S+\.\S+/.test(v), // Email validation regex
            message: props => `${props.value} is not a valid email!`
        }
    },
    passwordHash: {
        type: String,
        required: true,
        minLength: 6,
    },
    userClass: {
        type: String,
        enum: ['Admin', 'Regular User'],
        default: 'Regular User',
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
});

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = {
    User
};