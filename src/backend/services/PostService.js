const { getPost } = require("../controllers/PostController");

// Function to fetch post by ID
async function getPostById(postId) {
    console.log("Getting post with ID: " + postId);

    let result = await getPost({ _id: postId });

    if (!result) {
        console.log("Post not found.");
        return null;
    }

    console.log("Post has been found: " + result);
    return result;
}

module.exports = { getPostById };
