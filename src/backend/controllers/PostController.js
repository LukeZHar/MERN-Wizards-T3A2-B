// Provide CRUD functionalities for Post Model
const mongoose = require('mongoose');

const { PostModel } = require("../models/PostModel")

// Function to create a post
async function createPost(title, content, priority, category, authorId, replies, isArchived) {
    let result = await PostModel.create({
        // postID and date has default values
        title: title,
        content: content,
        priority: priority,
        category: category,
        authorId: new mongoose.Types.ObjectId(authorId),
        replies: replies,
        isArchived: isArchived
    })

    return result;
}

// Function to get posts
async function getPost(query) {
    let result = await PostModel.findOne(query);

    return result;
}

async function getPosts() {
    let result = await PostModel.find();

    return result;

}

module.exports = {
    createPost,
    getPost,
    getPosts
}