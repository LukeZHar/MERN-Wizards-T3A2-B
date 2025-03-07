const mongoose = require("mongoose");

// Make Schema
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 4,
        trim: true
    },
    content: {
        type: String,
        required: true,
        minLength: 6,
        trim: true
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true,
        index: true // for search purposes
    },
    category: {
        type: String,
        enum: ["Option 1", "Option 2", "Option 3", "Option 4"],
        required: true,
        index: true
    },
    author: { // reference to User model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    replies: [{ // reference to Reply model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply',
        default: []
    }],
    isArchived: {
        type: Boolean,
        default: false
    }},
    {
        timestamps: true
    }
);

// Make Model based on Schema
const Post = mongoose.model("Post", PostSchema);

// Export the model
module.exports = {
    Post
};