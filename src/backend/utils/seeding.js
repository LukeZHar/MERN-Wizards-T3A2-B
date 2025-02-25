// Seed values into DB
const { createPost } = require("../controllers/postController");
const { dbConnect, dbDisconnect } = require("./database");

async function seed() {
    await dbConnect();

    console.log("Connected to DB. Seeding now...")

    await createPost ("Important task", "Team A needs to perform this task", "high", "category 1", 1, "Hello", true);

    console.log("Seeding complete. Disconnecting...");

    dbDisconnect();

    console.log("Disconnected!");
}

seed();