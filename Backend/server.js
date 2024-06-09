const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./collection");
const cors = require("cors");

app.use(cors());
// MongoDB connection string
const uri = "mongodb://localhost:27017/zimeshare";

mongoose
  .connect(uri)
  .then((res) => console.log("connection established"))
  .catch((err) => console.log(err));

// API to retrieve data

app.get("/api/products", async (req, res) => {
  try {

    const product = await Product.find({});
    return res.send(product);
  } catch (err) {
    console.log(err);
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
