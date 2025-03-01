const express = require("express");
const { createPost, getAllPosts, getUserPost } = require("../controllers/PostController");
const { validateToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// Use the validateToken middleware on this route
router.use(validateToken);

// GET localhost:5000/api/posts/
router.get("/", getAllPosts);

// GET localhost:8008/api/posts/:id
router.get("/id", getUserPost);

// POST localhost:5000/api/posts/
router.post("/", createPost);

module.exports = router;