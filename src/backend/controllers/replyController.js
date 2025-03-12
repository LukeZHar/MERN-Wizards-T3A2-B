const Reply = require('../models/ReplyModel');
const { Post } = require('../models/PostModel'); // Import Post model to verify post existence

// Function to handle adding a reply to a post
async function addReply(req, res) {
    const { id } = req.params; // Get post ID from the route parameters
    const { content } = req.body; // Get the reply content from the request body

    // Ensure user is authenticated
    if (!req.authUserData || !req.authUserData.userId) {
        return res.status(401).json({ message: "Unauthorized - User ID missing from token" });
    }

    // Validation for reply
    if (!content || content.trim() === "") {
        return res.status(400).json({ message: "Reply content cannot be empty." });
    }

    try {
        // Check if the post exists
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const userId = req.authUserData.userId; // Fetch User
        
        // Create a new reply
        const newReply = new Reply({
            content: content,
            postId: id, // Link to the post
            userId: userId // Use the authenticated user's ID
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

async function getRepliesByPostId(req, res) {
    const { id } = req.params; // Extract post ID from the route

    try {
        // Check if the post exists
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Fetch replies linked to the post, populate with username
        const replies = await Reply.find({ postId: id }).populate("userId", "username"); 

        res.status(200).json(replies);
    } catch (error) { // error msgs
        console.error("Error fetching replies:", error);
        res.status(500).json({ message: "Error fetching replies" });
    }
}

// Export the reply controller functions
module.exports = {
    addReply,
    getRepliesByPostId
};
