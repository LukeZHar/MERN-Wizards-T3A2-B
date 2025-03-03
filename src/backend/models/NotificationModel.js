const mongoose = require('mongoose');

// Define the Notification schema
const notificationSchema = new mongoose.Schema({
    recipientID: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User',
        required: true, // Each notification must have a corresponding recipient
    },
    relatedPostID: {
        type: mongoose.Schema.Types.ObjectId, // Optional reference to a Post, if applicable
        ref: 'Post',
        default: null, // Default to null if there is no related post
    },
    message: {
        type: String,
        required: true, // Message content is required
    },
    creationDate: {
        type: Date,
        default: Date.now, // Automatically set to the current date/time
    },
    isRead: {
        type: Boolean,
        default: false, // Notification is not read by default
    },
});

// Create the Notification model from the schema
const Notification = mongoose.model('Notification', notificationSchema);

// Export the Notification model
module.exports = Notification;