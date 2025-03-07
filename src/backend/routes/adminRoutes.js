const express = require('express');
const { validateToken } = require('../middlewares/authMiddleware'); // Ensure you have JWT validation middleware
const {
    searchUsers,
    searchPosts
} = require('../controllers/adminController'); // Import the corresponding controller

const router = express.Router();





module.exports = router; // Export the router