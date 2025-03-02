const express = require("express");
const { createPost, getAllPosts, getUserPost } = require("../controllers/PostController");
// const { validateToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// Use the validateToken middleware on this route
// router.use(validateToken);

// GET /api/posts/
router.get("/", getAllPosts);

// GET api/posts/:id
// router.get("/:id", getUserPost);
router.get("/user/:id", getUserPost); 

// POST /api/posts/
router.post("/", createPost);

module.exports = router;