const express = require("express");
const { createPost, getAllPosts } = require("../controllers/postController");
const { validateToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// GET /api/posts/
router.get("/", getAllPosts);

// POST /api/posts/
router.post('/', validateToken, createPost);

module.exports = router;