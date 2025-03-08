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

        // Filter by user class
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

// Function to allow Admins to update user's role
async function updateUserRole(req, res) {
    try {
        const { id } = req.params; // fetch user id 
        const { userClass } = req.body; // fetch new role

        // Update User's role
        const updatedUser = await User.findByIdAndUpdate(id, { userClass }, { new: true }).select("-passwordHash");

        if (!updatedUser) { // display error msg if user not found
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User role updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error updating user role", error: error.message });
    }
}

// Function to allow Admins to update post's priority 
async function updatePostPriority(req, res) {
    try {
        const { id } = req.params; // fetch post id
        const { priority } = req.body; // fetch new priority

        // Enforce valid options
        const validPriorities = ["High", "Medium", "Low"];
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({ message: "Invalid priority level" });
        }

        // Update User's role
        const updatedPost = await Post.findByIdAndUpdate(id, { priority }, { new: true });

        if (!updatedPost) { // display error msg if user not found
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({ message: "Post priority updated successfully", updatedPost });
    } catch (error) {
        res.status(500).json({ message: "Server error updating post priority", error: error.message });
    }
}


// Function to allow Admins to delete a user
async function deleteUser(req, res) {
    try {
        const { id } = req.params; // Get user ID 

        // Check if the user exists before deleting
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user
        await User.findByIdAndDelete(id);

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error deleting user", error: error.message });
    }
}

// Function to allows admins to delete post
async function deletePost(req, res) {
    try {
        const { id } = req.params; // Get user ID 

        // Check if the user exists before deleting
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Delete the post
        await Post.findByIdAndDelete(id);

        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error deleting post", error: error.message });
    }
}

module.exports = {
    searchPosts,
    searchUsers,
    updateUserRole,
    updatePostPriority,
    deleteUser,
    deletePost
}