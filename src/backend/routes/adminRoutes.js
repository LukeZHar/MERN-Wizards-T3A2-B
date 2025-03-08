const express = require('express');
const { validateToken } = require('../middlewares/authMiddleware'); // JWT validation middleware
const { isAdmin } = require('../middlewares/adminMiddleware'); // Ensure user is Admin
const { searchUsers, updateUserRole, deleteUser, searchPosts, updatePost, deletePost } = require('../controllers/adminController'); 

const router = express.Router();

// GET /api/admin/search-users - Retrieve users
router.get("/users", searchUsers);

// // PATCH /api/admin/users/:id - Update user role 
// router.patch("/users/:id", validateToken, isAdmin, updateUserRole);

// // DELETE api/admin/users/:id - Delete a user
// router.delete("/users/:id", validateToken, isAdmin, deleteUser);

// GET /api/admin/search-posts - Retrieve posts
router.get("/posts", searchPosts);

// // PATCH /api/admin/post/:id - Update post
// router.patch("/posts/:id", validateToken, isAdmin, updatePost);

// // DELETE api/admin/post/:id - Delete a post
// router.delete("/posts/:id", validateToken, isAdmin, deletePost);

// Export the router
module.exports = router; 