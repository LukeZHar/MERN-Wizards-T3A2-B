const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Link to the user who creates the post
        required: true,
        ref: 'User'
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = {
    Post
};