const express = require('express');
const { validateToken } = require('../middlewares/authMiddleware'); // Ensure you have JWT validation middleware
const {
    getUserProfile,
    updateUserProfile,
    updateUserPassword
} = require('../controllers/userController'); // Import the corresponding controller

const router = express.Router();

// GET /api/users/profile - Retrieve user profile by user ID
router.get("/profile", validateToken, getUserProfile); // Middleware to validate token

// PATCH /api/users/:id - Update user profile by user ID
router.patch("/update-profile", validateToken, updateUserProfile); // Middleware to validate token

// PATCH /api/users/password - Update user password by user ID
router.patch("/update-password", validateToken, updateUserPassword);

module.exports = router; // Export the router