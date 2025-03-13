const { Post } = require("../models/PostModel");
const Reply = require('../models/ReplyModel');

// Function to create a post 
async function createPost(req, res) {
    // Enforce auth 
    if (!req.authUserData || !req.authUserData.userId) {
        return res.status(401).json({ message: "Unauthorized - User ID missing from token" });
    }

    // Fetch fields from request body
    // Fetch user from JWT
    try {
        const { title, content, priority, category } = req.body;
        const author = req.authUserData.userId;

        // Create post
        const post = await Post.create({ title, content, priority, category, author });
        
        res.status(201).json(post);
    } catch (error) {
        // returns error msgs
        console.log("Error creating the post:", error); // debug purposes
        res.status(500).json({ message: error.message });
    }
}

// Function to get all posts
async function getAllPosts(req, res) {
    try {
        const posts = await Post.find().populate("author", "username email");
        res.json(posts);
    } catch (error) {
        console.error("Error fetching the posts:", error);
        res.status(500).json({ message: error.message });
    }
}

// Function to get specific post
async function getPostById(req, res) {
    const { id } = req.params;

    try { // send author info along with post
        const post = await Post.findById(id).populate("author", "username email");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post); // return post
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ message: "Error fetching post" });
    }
}

// Function to edit specific post (Middleware ensures authorization)
async function editPost(req, res) {
    try {
        // Validate input fields or ensure fields exist
        const { title, content, priority, category } = req.body;

        if (!title && !content && !priority && !category) {
            return res.status(400).json({ message: "No fields to update" });
        }

        // Use post instance attached from isPostAuthor middleware
        if (title) req.post.title = title;
        if (content) req.post.content = content;
        if (priority) req.post.priority = priority;
        if (category) req.post.category = category;

        // Save updated post to the database
        const updatedPost = await req.post.save();

        // Return the updated post as JSON response
        res.status(200).json(updatedPost);
    } catch (error) {
        // Catch possible errors and respond with an error message
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Error updating post", error: error.message });
    }
}

// Function to delete post (Middleware ensures authorization)
async function deletePost(req, res) {
    try {
        // Delete all replies linked to the post
        await Reply.deleteMany({ postId: req.post._id });

        await req.post.deleteOne(); // Use post attached from middleware
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: error.message });
    }
}

// Export functions
module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    editPost,
    deletePost
};
