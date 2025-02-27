// Drop values in DB
const { dbConnect, dbDisconnect, dbDrop} = require("./database.js");

async function drop() {
    await dbDrop();

    dbDisconnect();

    console.log("Disconnected!");
}

dbConnect().then(() => {
    console.log("Connected to the DB. Dropping now...");
    drop();
})