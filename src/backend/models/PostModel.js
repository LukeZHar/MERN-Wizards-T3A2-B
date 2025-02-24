const mongoose = require("mongoose");

// Make Schema
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 6
    },
    content: {
        type: String,
        required: true
    },
    priority: {
        type: String
    },
    category: {
        type: String
    }
});

// Make Model based on Schema
const PostModel = mongoose.model("Post", PostSchema);

// Export the model
module.exports = {
    PostModel
}