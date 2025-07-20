const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const orderSchema = require("./order-schema");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password " + value);
        }
      },
    },
    role: {
      type: String,
      default: "user",
    },
    cart: {
      type: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
          quantity: { type: Number, min: 1 },
        },
      ],
      default: [],
    },
    orders: [orderSchema],
  },
  { versionKey: false }
);

userSchema.methods.generateRefreshToken = async function () {
  const user = this;
  const token = await jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

userSchema.methods.generateAccessToken = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
