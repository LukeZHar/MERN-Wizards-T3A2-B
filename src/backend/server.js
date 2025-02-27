const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(helmet());

// let corsOptions = {
//     origin: ["http://localhost:3000", "http://localhost:5173", "https://reactapp.com"],
// }

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the backend of A Ticket a Task It"
    })
})

app.use("/api/auth", authRoutes);

app.use("/api/posts", postRoutes);

module.exports = { app };