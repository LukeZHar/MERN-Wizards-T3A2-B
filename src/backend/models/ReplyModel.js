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
}, { timestamps: true }); // Automatically add createdAt & updatedAt fields

// Create the Reply model
const Reply = mongoose.model('Reply', ReplySchema);

// Export the Reply model
module.exports = Reply;
