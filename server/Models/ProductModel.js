const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  req_date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("products", ProductSchema);
