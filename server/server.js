require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors()); // Enables CORS for all routes
app.use(express.json({ limit: "200mb" })); // Parses JSON body requests with a higher limit
app.use(
  express.urlencoded({ limit: "200mb", extended: true, parameterLimit: 50000 })
);

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
    const modifiedShoes = shoes.map((shoe) => {
      return {
        ...shoe,
        _id: shoe._id.toString(), // Convert ObjectId to string
      };
    });
    res.json(modifiedShoes);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error fetching shoes data");
  }
});

app.post("/api/shoes", async (req, res) => {
  try {
    const { title, type, category, price, image } = req.body;

    const result = await shoesCollection.insertOne({
      title,
      type,
      category,
      price: parseInt(price, 10), // ensure this is a number
      image, // This is base64 image string
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
