const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, minLength: 5 },
    image: { type: String, required: true },
    price: { type: Number, required: true, min: 1, max: 500 },
    quantity: { type: Number, required: true, min: 0, max: 10 },
    category: {
      type: String,
      required: true,
      lowercase: true,
      enum: {
        values: ["vegetables", "fruits"],
        message: "Category must be either 'vegetables' or 'fruits'",
      },
    },
    unit: {
      type: String,
      required: true,
      enum: ["g", "kg", "pcs", "pc"],
      default: "g",
    },
    weight: { type: Number, min: 0, max: 500 },
    packSize: { type: Number, min: 1, max: 4 },
    inStock: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("validate", function (next) {
  const product = this;
  if (!product.weight && !product.packSize) {
    return next(new Error("Product must have either weight or pack size"));
  }
  next();
});

const Products = mongoose.model("Products", productSchema);
module.exports = Products;
