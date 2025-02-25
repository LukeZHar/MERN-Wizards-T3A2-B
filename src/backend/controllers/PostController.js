// Provide CRUD functionalities for Post Model
const mongoose = require('mongoose');

const { PostModel } = require("../models/PostModel")

// Function to create a post
async function createPost(title, content, priority, category, authorId, replies, isArchived) {
    let result = await PostModel.create({
        // postID and date has default values
        title: "Task to do",
        content: "What to do",
        priority: "high",
        category: "example1",
        authorId: new mongoose.Types.ObjectId(),
        replies: [],
        isArchived: false
    })

    return result;
}

module.exports = {
    createPost
}