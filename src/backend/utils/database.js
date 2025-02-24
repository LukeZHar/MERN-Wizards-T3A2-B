const mongoose = require('mongoose');

async function connectDB() {
    let databaseUrl = process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/${process.env.npm_package.name}`;

    try {
        await mongoose.connect(databaseUrl);
        console.log('Database connected');
    } catch (error) {
        console.error("Database connection error", error);
        process.exit(1);
    }
}

module.exports = { connectDB };