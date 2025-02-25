const mongoose = require("mongoose");
const { PostModel } = require("../models/PostModel");

// Function to connect to DB
async function dbConnect() {
    // let databaseUrl = process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/${process.env.npm_package_name}`;

    let databaseUrl = `mongodb://127.0.0.1:27017/${process.env.npm_package_name}`;

    console.log(databaseUrl);
    await mongoose.connect(databaseUrl);
    console.log("DB connected!") 
}

module.exports = {
    dbConnect
}