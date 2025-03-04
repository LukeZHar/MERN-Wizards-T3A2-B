
const mongoose = require("mongoose");

// Make Schema
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 4
    },
    content: {
        type: String,
        required: true,
        minLength: 6
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true
    },
    category: {
        type: String,
        enum: ["Option 1", "Option 2", "Option 3", "Option 4"],
        required: true
    },
    authorId: { // reference to User model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    replies: [{ // reference to Reply model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply',
        default: []
    }],
    isArchived: {
        type: Boolean,
        default: false
    }
});

// Make Model based on Schema
const Post = mongoose.model("Post", PostSchema);

// Export the model
module.exports = {
    Post
};