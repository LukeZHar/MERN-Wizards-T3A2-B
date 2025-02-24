const { response } = require("express");
const { Post } = require("../models/PostModel");

// CRUD operations to be defined here

// Read - Get all posts
async function getAllPosts(req, res) {
    try {
        const posts = await Post.find({
            user: req.authUserData.userId
        });
        res
        .status(200)
        .json(posts);
    } catch (error) {
        res
        .status(500)
        .json({ 
            error: error.message 
        });
    }
};

// Create - Create a new post
async function createPost(req, res) {
    try {
        const { title, content } = req.body;
        const post = await Post.create({
            title,
            content,
            user: req.authUserData.userId
        });

        res
        .status(201)
        .json(post);
    } catch (error) {
        res
        .status(500)
        .json({ 
            error: error.message 
        });
    }
};

module.exports = {
    getAllPosts,
    createPost
}