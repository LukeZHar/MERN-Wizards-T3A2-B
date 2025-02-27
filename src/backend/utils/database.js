const mongoose = require('mongoose');

// Function to connect to DB
async function connectDB() {
    let databaseUrl = process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/${process.env.npm_package_name}`;

    try {
        await mongoose.connect(databaseUrl);
        console.log('Database connected');
    } catch (error) {
        console.error("Database connection error", error);
        process.exit(1);
    }
}

// Disconnect DB
async function dbDisconnect() {
    await mongoose.disconnect();
};

// Drop DB
async function dbDrop() {
    await mongoose.connection.db.dropDatabase();
};

module.exports = { 
connectDB,
dbDisconnect,
dbDrop 
};