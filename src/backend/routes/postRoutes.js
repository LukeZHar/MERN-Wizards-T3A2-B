const express = require("express");
const { createPost } = require("../controllers/PostController");

const router = express.Router();

// GET localhost:8008/api/posts
router.get("/", () => {
    console.log("Placeholder")
});

// POST localhost:8008/api/posts
router.post("/", createPost);

module.exports = router;





// OLD CODE
// const express = require("express");

// const router = express.Router();

// const { getPosts, getPost } = require('../controllers/PostController'); 
// const { getPostById } = require("../services/PostService");

// // Get Post based on query
// router.get("/search/query", async (request, response) => {
//     let query = request.query;

//     let result = await getPost(query);

//     response.json({
//         data:result
//     });
// });

// // Get One post by ID
// router.get("/search/:postId", async (request, response) => {
//     const postId = request.params.postId;
    
//     const result = await getPostById(postId);
//     console.log("Post has been found: " + result);

//     response.json({
//         data:result
//     });
// });

// // Get all Posts
// router.get("/all", async (request, response) => {
//     let result = await getPosts({});
//     // console.log("All posts:" + JSON.stringify(result));

//     response.json({
//         data: result
//     });
// });


// module.exports = router;
