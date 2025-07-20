const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const orderSchema = new Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],
  shippingDetails: {
    name: String,
    address: String,
    phone: String,
  },
  totalAmount: Number,
  placedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = orderSchema;
