const Reply = require('../models/ReplyModel');
const Post = require('../models/PostModel'); // Import Post model to verify post existence

// Function to handle adding a reply to a post
async function addReply(req, res) {
    const { id } = req.params; // Get post ID from the route parameters
    const { username, content } = req.body; // Get the reply content from the request body

    try {
        // Check if the post exists
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Create a new reply
        const newReply = new Reply({
            content: content,
            postId: id, // Link to the post
            userId: req.authUserData.id // Use the authenticated user's ID
        });

        // Save the reply to the database
        const savedReply = await newReply.save();

        // Optionally, add this reply's ID to the post's replies array
        post.replies.push(savedReply._id);
        await post.save();

        res.status(201).json(savedReply); // Respond with the created reply
    } catch (error) {
        console.error("Error saving reply:", error);
        res.status(500).json({ message: "Error saving reply" });
    }
}

// Export the reply controller function
module.exports = {
    addReply
};
