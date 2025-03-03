const { app } = require("./server"); // Import the Express app from server.js
const { connectDB } = require("./utils/database"); // Import the database connection utility
require("dotenv").config(); // Load environment variables from the .env file

// Get the port from environment variables or default to 8008
const PORT = process.env.PORT || 8008;

// Start the server and establish the database connection
app.listen(PORT, async () => {
    try {
        await connectDB(); // Connect to the database
        console.log('Database connected'); // Log success message
        console.log(`Server running on port ${PORT}`); // Log the server running port
    } catch (error) {
        console.error("Failed to connect to the database:", error); // Handle database connection errors
    }
});