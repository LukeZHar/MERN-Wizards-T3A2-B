const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");


const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoutes);


module.exports = { app };