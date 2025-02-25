// Configure the server
const express = require("express");

// Instance of express for configuration
const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "Hello World!"
    })
});

// Export the server
module.exports = {
    app
}
