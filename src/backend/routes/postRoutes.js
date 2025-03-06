// Imports
const express = require("express");
const { createPost, getAllPosts, getPostById, editPost, deletePost } = require("../controllers/postController");
const { validateToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// GET /api/posts/ - See all posts
router.get("/", getAllPosts);

// GET /api/posts/:id - Get a specific post by ID
router.get("/:id", getPostById);

// POST /api/posts/create-post - Creates a post
router.post('/create-post', validateToken, createPost);

// PATCH /api/posts/edit-post - Update a post 
router.patch("/edit-post", validateToken, editPost);

// DELETE /api/posts/delete-post - Delete a post 
router.delete("/delete-post", validateToken, deletePost);

// Export the router
module.exports = router;