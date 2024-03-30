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
const db = client.db("sleek-walk"); // database name

const shoesCollection = db.collection("shoes"); // collection name
const ordersCollection = db.collection("orders"); // collection name

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

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await ordersCollection.find().toArray();
    const modifiedOrders = orders.map((order) => {
      return {
        ...order,
        _id: order._id.toString(), // Convert ObjectId to string
      };
    });
    res.json(modifiedOrders);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error fetching orders data");
  }
});

// POST endpoint to insert an order
app.post("/api/orders", async (req, res) => {
  try {
    const orderData = req.body;
    // Perform validation or transformation as necessary
    const result = await db.collection("orders").insertOne(orderData);
    res.status(201).json({ message: "Order created successfully", orderId: result.insertedId });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error adding new order");
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
