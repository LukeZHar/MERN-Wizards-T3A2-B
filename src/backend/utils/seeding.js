// Seed values into DB
const mongoose = require('mongoose');
const { createPost, getPost } = require("../controllers/PostController");
const { dbConnect, dbDisconnect } = require("./database");

async function seed() {
    await dbConnect();

    console.log("Connected to DB. Seeding now...")

    // Create a valid ObjectId for the reply
    const validReplyId = new mongoose.Types.ObjectId();

    await createPost(
        "Important task", 
        "Team A needs to perform this task", 
        "high", 
        "category 1", 
        1, 
        validReplyId, 
        true
    );

    await createPost(
        "Not so important task", 
        "Team B needs to perform this task", 
        "low", 
        "category 1", 
        1, 
        [validReplyId], 
        false
    );

    console.log("Seeding complete. Disconnecting...");

    dbDisconnect();

    console.log("Disconnected!");
}

seed();