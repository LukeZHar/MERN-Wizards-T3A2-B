const express = require("express");
const { getAllPosts, createPost } = require("../controllers/postController");
const { validateToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// Use the validateToken middleware on this route
router.use(validateToken);

// GET localhost:5000/api/posts/
router.get("/", getAllPosts);

// POST localhost:5000/api/posts/
router.post("/", createPost);

module.exports = router;
