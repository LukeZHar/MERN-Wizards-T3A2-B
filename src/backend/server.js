// Configure the server
const express = require("express");

// Instance of express for configuration
const app = express();

// Imports to secure the application
const cors = require("cors");
const helmet = require("helmet");

// let corsOptions = {
//     origin: ["http://localhost:3000", "http://localhost:5173", "https://reactapp.com"],
//     methods:["GET", "POST"]
// } Apply this later

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Import Router
const postRoute = require("./routes/postRoutes.js");
app.use("/api/posts", postRoute);

// Export the server
module.exports = {
    app
}
