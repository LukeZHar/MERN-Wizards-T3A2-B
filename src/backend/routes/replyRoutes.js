const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/authMiddleware'); // Ensure JWT validation
const { addReply } = require('../controllers/replyController'); // Import the reply controller

// Endpoint to add a reply to a post
router.post('/posts/:id/replies', validateToken, addReply); // Validate token for secure reply submission

// Export the router
module.exports = router;
