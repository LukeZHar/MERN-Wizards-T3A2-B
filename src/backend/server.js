// Configure the server
const express = require("express");

// Instance of express for configuration
const app = express();

// Imports to secure the application
const cors = require("cors");
const helmet = require("helmet");

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

//OLD CODE
// app.get("/", (req, res) => {
//     res.json({
//         message: "Hello World!"
//     })
// });

// // Export the server
// module.exports = {
//     app
// }
