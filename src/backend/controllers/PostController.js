// Provide CRUD functionalities for Post Model
const mongoose = require('mongoose');

const { PostModel } = require("../models/PostModel")

// Function to create a post
async function createPost(request, response) {
    try {
        const { title, content, priority, category, authorId, replies, isArchived } = request.body;

        const post = await PostModel.create({
            title,
            content,
            priority,
            category,
            authorId: request.authUserData,
            replies: replies,
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

// Function to get a specific post by the authenticated user
async function getUserPost(request, response) {
    try {
        // Extract user ID from authUserData
        const userId = request.authUserData.id; 

        const post = await Post.findOne({ user: userId });

        if (!post) {
            return response
            .status(404)
            .json({ message: "Post not found for this user" });
        }

        response.json(post);
    } catch (error) {
        response
        .status(500)
        .json({ message: error.message });
    }
}

// Export functions
module.exports = {
    createPost,
    getAllPosts,
    getUserPost
}

// OLD CODE 
// Function to create a post
// async function createPost(title, content, priority, category, authorId, replies, isArchived) {
//     let result = await PostModel.create({
//         // postID and date has default values
//         title: title,
//         content: content,
//         priority: priority,
//         category: category,
//         authorId: new mongoose.Types.ObjectId(authorId),
//         replies: replies,
//         isArchived: isArchived
//     })

//     return result;
// }

// // Function to get posts
// async function getPost(query) {
//     let result = await PostModel.findOne(query);
//     // Function above to back populate when we integrate with User Model
//     // let result = await PostModel.findOne(query).populate("authorId"); 

//     return result;
// }

// async function getPosts() {
//     let result = await PostModel.find();

//     return result;

// }