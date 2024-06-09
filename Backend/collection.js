const { model, Schema } = require("mongoose");
const collectionName = "products";
const productSchema = new Schema({
  title: String,
  price: Number,
  images: Array,
});

module.exports = model(collectionName, productSchema, collectionName);
