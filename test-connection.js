// test-connection.js
const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Connection failed:", error);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
