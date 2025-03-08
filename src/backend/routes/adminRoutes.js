const express = require('express');
const { validateToken } = require('../middlewares/authMiddleware'); // JWT validation middleware
const { isAdmin } = require('../middlewares/adminMiddleware'); // Ensure user is Admin
const { searchUsers, searchPosts } = require('../controllers/adminController'); // Import the corresponding controller

const router = express.Router();

// GET /api/admin/search-users - Retrieve users
router.get("/search-users", validateToken, searchUsers); // Middleware to validate token

// GET /api/admin/search-posts - Retrieve posts
router.get("/search-posts", validateToken, searchPosts); // Middleware to validate token

module.exports = router; // Export the router