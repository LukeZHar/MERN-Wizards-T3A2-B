// Initialise the server
const { app } = require("./server.js");
const { dbConnect } = require("./utils/database.js");

require("dotenv").config();

// Get the PORT
const PORT = process.env.PORT || 8008;

// Listen to incoming traffic
app.listen(PORT, async() => {
    await dbConnect();

    console.log(`Server is running on port: ${PORT}`);
});