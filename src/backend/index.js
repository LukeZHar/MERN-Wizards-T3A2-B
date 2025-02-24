const { app } = require("./server");
const { connectDB } = require("./utils/database");

require("dotenv").config();

// Get the port
const PORT = process.env.PORT || 8008;

app.listen(PORT, async() => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});