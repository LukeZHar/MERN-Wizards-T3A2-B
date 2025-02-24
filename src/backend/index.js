// Initialise the server
const { app } = require("./server.js");

// Get the PORT
const PORT = process.env.PORT || 8008;

// Listen to incoming traffic
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});