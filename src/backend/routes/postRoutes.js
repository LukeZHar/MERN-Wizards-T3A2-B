// Imports
const express = require("express");
const { createPost, getAllPosts, getPostById, editPost, deletePost } = require("../controllers/postController");
const { validateToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// GET /api/posts/ - See all posts
router.get("/", getAllPosts);

// GET /api/posts/:id - Get a specific post by ID
router.get("/:id", getPostById);

// POST /api/posts/ - Creates a post
router.post("/", validateToken, createPost);

// PATCH /api/posts/:id - Update a post 
router.patch("/:id", validateToken, editPost);

// DELETE /api/posts/:id - Delete a post 
router.delete("/:id", validateToken, deletePost);

// Export the router
module.exports = router;
