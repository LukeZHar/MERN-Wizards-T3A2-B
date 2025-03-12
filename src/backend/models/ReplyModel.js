const mongoose = require('mongoose');

// Define the reply schema
const ReplySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true, // Trim whitespace
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true // Link to the post
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Link to the user making the reply
    }
}, {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
});

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
ReplySchema.path("createdAt").get(formatDate);
ReplySchema.path("updatedAt").get(formatDate);

// Create the Reply model
const Reply = mongoose.model('Reply', ReplySchema);

// Export the Reply model
module.exports = Reply;
