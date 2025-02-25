// Configure the server
const express = require("express");

// Instance of express for configuration
const app = express();

// Middleware to read JSON
app.use(express.json());

// Import Router
const PostRoute = require("../backend/routes/PostRoute.js");
app.use("/posts", PostRoute);


app.get("/", (req, res) => {
    res.json({
        message: "Hello World!"
    })
});

// Export the server
module.exports = {
    app
}
