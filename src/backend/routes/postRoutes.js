const express = require("express");
const router = express.Router();

// GET localhost:5000/api/posts/
router.get("/", () => {
    console.log("get all posts");
});

// POST localhost:5000/api/posts/
router.post("/", () => {
    console.log("create post");
});

module.exports = router;
