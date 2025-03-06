const { Post } = require("../models/PostModel");

// Middleware to check if the user is the author of the post
async function isPostAuthor(req, res, next) {
    try {
        const { id } = req.params;

        // Fetch post by ID
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Ensure only the author can edit or delete
        if (post.author.toString() !== req.authUserData.userId) {
            return res.status(403).json({ message: "Forbidden, you can only modify your own posts." });
        }

        req.post = post; // Attach post to request object
        next(); // Move to the next middleware or controller function
    } catch (error) {
        console.error("Authorization error:", error);
        res.status(500).json({ message: "Authorization error" });
    }
}

module.exports = { isPostAuthor };