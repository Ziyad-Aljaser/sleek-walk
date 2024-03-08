require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors()); // Enables CORS for all routes
app.use(express.json()); // Parses JSON body requests

const port = process.env.PORT || 3001;

// Connect to MongoDB
const client = new MongoClient(process.env.MONGODB_API);
client.connect();
const db = client.db("sleek-walk"); // Your database name
const shoesCollection = db.collection("shoes"); // Your collection name

// GET endpoint to fetch all shoes
app.get("/api/shoes", async (req, res) => {
  try {
    const shoes = await shoesCollection.find().toArray();
    res.json(shoes);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error fetching shoes data");
  }
});

app.post("/api/shoes", async (req, res) => {
  try {
    const { title, type, category, price } = req.body;
    // Assuming `price` is sent as a string, you may need to convert it to a number
    const parsedPrice = parseInt(price, 10);

    // Validate data here...

    const result = await shoesCollection.insertOne({
      title,
      type,
      category,
      price: parsedPrice, // ensure this is a number
    });

    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error adding new shoe");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
