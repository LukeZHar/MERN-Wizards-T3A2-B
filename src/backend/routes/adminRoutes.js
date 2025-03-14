const express = require('express');
const { validateToken } = require('../middlewares/authMiddleware'); // JWT validation middleware
const { searchUsers, updateUserRole, deleteUser, searchPosts, updatePostPriority, deletePost } = require('../controllers/adminController');
const { isAdmin } = require("../middlewares/adminMiddleware");

const router = express.Router();

// GET /api/admin/users - Retrieve users
router.get("/users", validateToken, isAdmin, searchUsers);

// PATCH /api/admin/users/:id - Update user role 
router.patch("/users/:id", validateToken, isAdmin, updateUserRole);

// DELETE api/admin/users/:id - Delete a user
router.delete("/users/:id", validateToken, isAdmin, deleteUser);

// GET /api/admin/posts - Retrieve posts
router.get("/posts", validateToken, isAdmin, searchPosts);

// PATCH /api/admin/post/:id - Update post
router.patch("/posts/:id", validateToken, isAdmin, updatePostPriority);

// // DELETE api/admin/post/:id - Delete a post
router.delete("/posts/:id", validateToken, isAdmin, deletePost);

// Export the router
module.exports = router; 