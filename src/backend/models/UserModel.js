
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        trim: true,
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
        enum: ['Admin', 'Regular User'],
        default: 'Regular User',
    },
    userAdmin: {
        type: Boolean,
        default: false,
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
