const express = require("express");
const { createPost, getAllPosts, getUserPost } = require("../controllers/PostController");
// const { validateToken } = require ("path")

const router = express.Router();

// Import validateToken middleware, this will be checked when merging with User model
// router.use(validateToken);

// GET localhost:8008/api/posts
router.get("/", getAllPosts);

// GET localhost:8008/api/posts/:id
router.get("/id", getUserPost);

// POST localhost:8008/api/posts
router.post("/", createPost);

module.exports = router;
