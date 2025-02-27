// Import Post model
const { Post } = require("../models/PostModel")

// Function to create a post
async function createPost(request, response) {
    try {
        const { title, content, priority, category, authorId, replies, isArchived } = request.body;

        const post = await Post.create({
            title,
            content,
            priority,
            category,
            authorId: request.authUserData.userId,
            replies: replies,
            isArchived
        });

        // send back acknowledgment msg
        response
        .status(201)
        .json(post);
    } catch (error) { // error msg
        response
        .status(500)
        .json({
            message: error.message
        });
    }
}

// Function to get all posts
async function getAllPosts(request, response) {
    try {
        const posts = await Post.find({});
        response.json(posts);
    } catch (error) {
        response
        .status(500)
        .json({
            message: error.message
        });
    }
}

// Function to get posts from a specific user
async function getUserPost(request, response) {
    try {
        const posts = await Post.find({ 
            authorId: request.authUserData.userId 
        });

        if (posts.length === 0) { 
            return response
            .status(404)
            .json({ message: "No posts found for this user" });
        }

        response.json(posts);
    } catch (error) {
        response
        .status(500)
        .json({ message: error.message });
    }
}

// Export functions
module.exports = {
    createPost,
    getAllPosts,
    getUserPost
}

// OLD CODE 
// Function to create a post
// async function createPost(title, content, priority, category, authorId, replies, isArchived) {
//     let result = await PostModel.create({
//         // postID and date has default values
//         title: title,
//         content: content,
//         priority: priority,
//         category: category,
//         authorId: new mongoose.Types.ObjectId(authorId),
//         replies: replies,
//         isArchived: isArchived
//     })

//     return result;
// }

// // Function to get posts
// async function getPost(query) {
//     let result = await PostModel.findOne(query);
//     // Function above to back populate when we integrate with User Model
//     // let result = await PostModel.findOne(query).populate("authorId"); 

//     return result;
// }

// async function getPosts() {
//     let result = await PostModel.find();

//     return result;

// }