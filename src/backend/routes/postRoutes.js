const express = require("express");
const { createPost, getAllPosts } = require("../controllers/PostController");
const { validateToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// Use the validateToken middleware on this route
// router.use(validateToken);

// GET /api/posts/
router.get("/", getAllPosts);

// POST /api/posts/
router.post('/', validateToken, createPost);

module.exports = router;