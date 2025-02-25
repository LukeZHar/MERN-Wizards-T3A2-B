const express = require("express");

const router = express.Router();
const { getPost, getPosts } = require('../controllers/PostController'); 


// Get One post by ID
router.get("/search/:postId", async (request, response) => {
    console.log("Getting post with ID: " + request.params.postId)
    
    let result = await getPost({_id: request.params.postId});
    console.log("Post has been found: " + result);

    response.json({
        data:result
    });
});

// Get all Posts
router.get("/all", async (request, response) => {
    let result = await getPosts({});
    // console.log("All posts:" + JSON.stringify(result));

    response.json({
        data: result
    });
});

module.exports = router;
