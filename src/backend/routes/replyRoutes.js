const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/authMiddleware'); // Ensure JWT validation
const { addReply, getRepliesByPostId, deleteReply } = require('../controllers/replyController'); // Import the reply controller

// Endpoint to add a reply to a post
router.post('/posts/:id/replies', validateToken, addReply); // Validate token for secure reply submission

// Endpoint to get replies for a specific post
router.get('/posts/:id/replies', validateToken, getRepliesByPostId); 

// Endpoint to delete a specific reply
router.delete('/posts/:id/replies', validateToken, deleteReply); 

// Export the router
module.exports = router;
