// Import Post model
const { Post } = require("../models/PostModel")

// Function to create a post
async function createPost(request, response) {
    try {
        const { title, content, priority, category, authorId, replies, isArchived } = request.body;

        const post = await Post.create({
            title,
            content,
            priority,
            category,
            authorId: null,
            replies: replies || [],
            isArchived: isArchived || false
        });

        // send back acknowledgment msg
        response
        .status(201)
        .json(post);
    } catch (error) { // error msg
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
        const posts = await Post.find({});
        response.json(posts);
    } catch (error) {
        response
        .status(500)
        .json({
            message: error.message
        });
    }
}

// Function to get posts from a specific user Updated
async function getUserPost(request, response) {
    try {
        const userId = request.params.id;

        if (!userId) {
            return response.status(400).json({ message: "User ID is required" });
        }

        const posts = await Post.find({ authorId: userId });

        if (posts.length === 0) { 
            return response.status(404).json({ message: "No posts found for this user" });
        }

        response.json(posts);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

// async function getUserPost(request, response) {
//     try {
//         const posts = await Post.find({ 
//             authorId: request.authUserData.userId 
//         });

//         if (posts.length === 0) { 
//             return response
//             .status(404)
//             .json({ message: "No posts found for this user" });
//         }

//         response.json(posts);
//     } catch (error) {
//         response
//         .status(500)
//         .json({ message: error.message });
//     }
// }

// Export functions
module.exports = {
    createPost,
    getAllPosts,
    getUserPost
}
