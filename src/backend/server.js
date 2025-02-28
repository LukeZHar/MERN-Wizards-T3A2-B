// Configure the server
const express = require("express");

// Imports to secure the application
const cors = require("cors");
const helmet = require("helmet");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

// Instance of express for configuration
const app = express();

let corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5173","http://localhost:8008", "https://reactapp.com"],
    methods:["GET", "POST"]
}

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

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