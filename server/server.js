require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

async function listShoes(client) {
    // Corrected to access the "sleek-walk" database and then the "shoes" collection
    const shoes = await client.db("sleek-walk").collection("shoes").find().toArray();
    return shoes;
}

app.get('/api/shoes', async (req, res) => {
    const url = process.env.MONGODB_API;
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB
        await client.connect();

        // Fetch data from the "shoes" collection in the "sleek-walk" database
        const shoes = await listShoes(client);
        res.json(shoes);
    } catch (e) {
        console.error(e);
        res.status(500).send('Error connecting to database');
    } finally {
        // Ensure the MongoDB client closes connection after operation is complete
        await client.close();
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
