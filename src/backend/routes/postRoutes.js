// Imports
const express = require("express");
const { createPost, getAllPosts, editPost, deletePost } = require("../controllers/postController");
const { validateToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// GET /api/posts/ - See all posts
router.get("/", getAllPosts);

// POST /api/posts/ - Creates a post
router.post('/', validateToken, createPost);

// PATCH /api/posts/:id - Update a post 
router.patch("/:id", editPost);

// DELETE /api/posts/:id - Delete a post 
router.delete("/:id", validateToken, deletePost);

// Export the router
module.exports = router;