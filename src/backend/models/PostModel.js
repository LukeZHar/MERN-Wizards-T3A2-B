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
        enum: ["Web Team", "Data Team", "IT Team", "Other"],
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
    }
},
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true }
    }
);

// Function to format date/time
function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}

// Apply the formatting to createdAt & updatedAt
PostSchema.path("createdAt").get(formatDate);
PostSchema.path("updatedAt").get(formatDate);

// Make Model based on Schema
const Post = mongoose.model("Post", PostSchema);

// Export the model
module.exports = {
    Post
};