const mongoose = require("mongoose");
const { PostModel } = require("../models/PostModel");

// Function to connect to DB
async function dbConnect() {
    // let databaseUrl = process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/${process.env.npm_package_name}`;

    let databaseUrl = `mongodb://127.0.0.1:27017/${process.env.npm_package_name}`;

    try {
        console.log(databaseUrl);
        await mongoose.connect(databaseUrl);
        console.log("DB connected!");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
        process.exit(1);
    }
};

// Disconnect DB
async function dbDisconnect() {
    await mongoose.disconnect();
};

// Drop DB
async function dbDrop() {
    await mongoose.connection.db.dropDatabase();
};

module.exports = {
    dbConnect,
    dbDisconnect,
    dbDrop
};