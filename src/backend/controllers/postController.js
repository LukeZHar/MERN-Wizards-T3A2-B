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
            authorId,
            replies,
            isArchived
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

// Export functions
module.exports = {
    createPost,
    getAllPosts
}