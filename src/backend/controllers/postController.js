// Import Post model
const { Post } = require("../models/PostModel")

// Function to create a post
async function createPost(request, response) {
    try {
        // Fetch fields to create a post
        const { title, content, priority, category } = request.body;

        // Extract `authorId` from the authenticated user
        const authorId = request.user.id;

        const post = await Post.create({
            title,
            content,
            priority,
            category,
            authorId
        });

        // send back acknowledgment msg
        response
            .status(201)
            .json(post);
    } catch (error) { // Display error msg
        response
            .status(500)
            .json({
                message: error.message
            });
    }
}

// Function to get all posts
async function getAllPosts(request, response) {
    try {
        // Find posts, if {} empty, it finds all posts created
        const posts = await Post.find({});

        // Display the post back
        response.json(posts);
    } catch (error) {
        // Display error msg
        response
            .status(500)
            .json({
                message: error.message
            });
    }
}

// Function to delete a post
async function deletePost(request, response) {
    try {
        // Fetch ID from parameters
        const { id } = request.params;
        const post = await Post.findByIdAndDelete(id);

        // Return error msg if post is not found
        if (!post) {
            return response.status(404).json({ message: "Post not found" });
        }

        // Return acknowledgment msg
        response.json({ message: "Post deleted successfully" });
    } catch (error) { // Display error msg
        response.status(500).json({ message: error.message });
    }
}

// Function to edit a specific post
async function editPost(request, response) {
    try {
        // Fetch ID from parameters and fields from req.body
        const { id } = request.params;
        const { title, content, priority, category } = request.body;

        const post = await Post.findByIdAndUpdate(
            id,
            { title, content, priority, category },
            { new: true, runValidators: true }
        );

        // Return msg when post is not found
        if (!post) {
            return response.status(404).json({ message: "Post not found" });
        }

        // Return acknowledgment msg
        response.json(post);
    } catch (error) { // Display error msg
        response.status(500).json({ message: error.message });
    }
}

// Export functions
module.exports = {
    createPost,
    getAllPosts,
    deletePost,
    editPost
}