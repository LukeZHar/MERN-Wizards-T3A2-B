const express = require('express');
const { validateToken } = require('../middlewares/authMiddleware'); // JWT validation middleware
const { isAdmin } = require('../middlewares/adminMiddleware'); // Ensure user is Admin
const { searchUsers, updateUserRole, deleteUser, searchPosts, updatePostPriority, deletePost } = require('../controllers/adminController');

const router = express.Router();

// GET /api/admin/users - Retrieve users
router.get("/users", searchUsers);

// PATCH /api/admin/users/:id - Update user role 
router.patch("/users/:id", updateUserRole);

// DELETE api/admin/users/:id - Delete a user
router.delete("/users/:id", deleteUser);

// GET /api/admin/posts - Retrieve posts
router.get("/posts", searchPosts);

// PATCH /api/admin/post/:id - Update post
router.patch("/posts/:id", updatePostPriority);

// // DELETE api/admin/post/:id - Delete a post
router.delete("/posts/:id", deletePost);

// Export the router
module.exports = router; 