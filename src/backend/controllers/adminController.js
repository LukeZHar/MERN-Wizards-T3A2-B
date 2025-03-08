// Imports
const { Post } = require("../models/PostModel");
const { User } = require("../models/UserModel");

// Function for Admins to fetch posts
async function searchPosts(req, res) {
    try {
        const { priority, category, author } = req.query;

        let filter = {};

        // Filter by priority
        if (priority) {
            filter.priority = priority;
        }

        // Filter by category
        if (category) {
            filter.category = category;
        }

        // Filter by user
        if (author) {
            const user = await User.findOne({ username: author });
            if (user) {
                filter.author = user._id;
            }
        }

        // Fetch post plus author details 
        const posts = await Post.find(filter).populate("author", "username email");

        // If no posts match the filter, send a message
        if (posts.length === 0) {
            return res.status(404).json({ message: "No posts found matching the criteria." });
        }

        // Display the posts back
        res.json(posts);
    } catch (error) {// Display error msg
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Function for Admins to fetch users with filters
async function searchUsers(req, res) {
    try {
        const { username, email, userClass } = req.query;
        let filter = {};

        // Filter by username
        if (username) {
            filter.username = { $regex: username, $options: "i" }; // Case-insensitive search
        }

        // Filter by email
        if (email) {
            filter.email = { $regex: email, $options: "i" };
        }

        // 🔹 Filter by user class
        if (userClass) {
            filter.userClass = userClass;
        }

        // Fetch users based on filter
        const users = await User.find(filter).select("-passwordHash"); // Exclude password for security

        // If no users match the filter, return a message
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found matching the criteria." });
        }

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    searchPosts,
    searchUsers
}