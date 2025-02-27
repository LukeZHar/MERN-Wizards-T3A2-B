const mongoose = require("mongoose");

// Make Schema
const PostSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
    },
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
        required: true
    },
    category: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // reference to User model
        required: true
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply' // reference to Reply model
    }],
    isArchived: {
        type: Boolean,
        default: false,
        required: true
    }
});

// Make Model based on Schema
const PostModel = mongoose.model("Post", PostSchema);

// Export the model
module.exports = {
    PostModel
}