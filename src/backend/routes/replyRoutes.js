const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/authMiddleware'); // Ensure JWT validation
const { addReply, getRepliesByPostId } = require('../controllers/replyController'); // Import the reply controller

// Endpoint to add a reply to a post
router.post('/posts/:id/replies', validateToken, addReply); // Validate token for secure reply submission

router.get('/posts/:id/replies', validateToken, getRepliesByPostId); 

// Export the router
module.exports = router;
