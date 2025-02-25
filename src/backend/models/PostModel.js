const mongoose = require("mongoose");

// Make Schema
const PostSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    title: {
        type: String,
        required: true,
        minLength: 4,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    priority: {
        type: String
    },
    category: {
        type: String
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
        default: false
    }
});

// Make Model based on Schema
const PostModel = mongoose.model("Post", PostSchema);

// Export the model
module.exports = {
    PostModel
}