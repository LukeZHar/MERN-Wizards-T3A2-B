const mongoose = require('mongoose');

let isConnected = false; // Track connection status

// Function to connect to DB
async function connectDB() {
    if (isConnected) {
        console.log('Already connected to the database.');
        return;
    }

    let databaseUrl = process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/${process.env.npm_package_name}`;

    try {
        await mongoose.connect(databaseUrl);
        isConnected = true; // Update status
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit process with failure
    }
}

// Function to disconnect from the database
async function dbDisconnect() {
    try {
        await mongoose.disconnect();
        console.log('Database disconnected');
    } catch (error) {
        console.error('Error disconnecting from database:', error);
    }
}

// Function to drop the database (useful for testing)
async function dbDrop() {
    try {
        await mongoose.connection.db.dropDatabase();
        console.log('Database dropped');
    } catch (error) {
        console.error('Error dropping database:', error);
    }
}


module.exports = {
    connectDB,
    dbDisconnect,
    dbDrop
};