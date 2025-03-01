// Configure the server
const express = require("express");

// Imports to secure the application
const cors = require("cors");
const helmet = require("helmet");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const { connectDB } = require("./utils/database");

// Instance of express for configuration
const app = express();

let corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5173","http://localhost:8008", "https://reactapp.com","https://mern-wizards-t3a2-b.onrender.com", "https://mernwizards-b.xhoo8.mongodb.net/"],
    methods:["GET", "POST"]
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
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Export the server
module.exports = { app };