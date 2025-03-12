// Configure the server
const express = require("express");

// Imports to secure the application
const cors = require("cors");
const helmet = require("helmet");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const notificationRoutes = require('./routes/notificationRoutes'); // Import notification routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

require('dotenv').config(); // Load environment variables
const { connectDB } = require("./utils/database");

// Instance of express for configuration
const app = express();

let corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5173","http://localhost:8008", "https://reactapp.com","https://mern-wizards-t3a2-b.onrender.com", "http://127.0.0.1:5173", "http://127.0.0.1:5174",  "https://mernwizards-b.xhoo8.mongodb.net/, "],
    methods:["GET", "POST","PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200 
}

// Middlewares
app.use(express.json()); // Enable JSON parsing for incoming requests
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Secure HTTP headers

// Connect to MongoDB
connectDB();

// Acknowledgment msg
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the backend of A Ticket a Task It"
    })
})

// Tell app to use routes
app.use("/api/auth", authRoutes); // Use auth routes
app.use("/api/posts", postRoutes); // Use post-related routes
app.use("/api/notifications", notificationRoutes); // Use notification-related routes
app.use("/api/users", userRoutes); // Use users-related routes
app.use("/api/admin", adminRoutes); // Use admin-related routes

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({ message: "An unexpected error occurred" }); // Send a generic error response
});

// Export the server
module.exports = { app };