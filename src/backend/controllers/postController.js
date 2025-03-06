const { Post } = require("../models/PostModel");

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

    try { // send author info along post
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

// Function to edit specific post
async function editPost(req, res) {
    if (!req.authUserData || !req.authUserData.userId) {
        return res.status(401).json({ message: "Unauthorized - User ID missing from token" });
    }

    // fetch fields 
    const { id } = req.params;
    const { title, content, priority, category } = req.body;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Ensure only author can edit the post
        if (post.author.toString() !== req.authUserData.userId) {
            return res.status(403).json({ message: "Forbidden, you can only edit your own posts." });
        }

        // Allow partial updates
        post.title = title || post.title;
        post.content = content || post.content;
        post.priority = priority || post.priority;
        post.category = category || post.category;
        await post.save();

        // return edited post
        res.json(post);
    } catch (error) {
        // catch possible errors and display back
        console.error("Error updating post:", error);
        res.status(500).json({ message: error.message });
    }
}

// Function to delete post
async function deletePost(req, res) {
    const { id } = req.params;
    try { // Conditional checks
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== req.authUserData.userId) {
            return res.status(403).json({ message: "Forbidden, you can only delete your own posts." });
        }

        // Delete post after conditional checks
        await Post.findByIdAndDelete(id);
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
}