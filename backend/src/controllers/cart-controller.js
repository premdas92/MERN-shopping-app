const Products = require("../models/product-model");
const User = require("../models/user-model");

const getUserCart = async (req, res) => {
  try {
    const userId = req.loggedInUser._id;
    const user = await User.findById(userId).populate("cart.productId", [
      "name",
      "price",
      "image",
    ]);
    const cartItems = user.cart.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      image: item.productId.image,
      quantity: item.quantity,
      totalPrice: item.quantity * item.productId.price,
    }));
    res.status(200).json({ cart: cartItems });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.loggedInUser._id).populate(
      "cart.productId",
      ["name", "price", "image"]
    );
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res
        .status(400)
        .json({ error: "Product ID and valid quantity are required." });
    }
    // Check if product exists
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if item is already in the cart
    const existingItemIndex = user.cart.findIndex(
      (item) => item.productId._id.toString() === productId.toString()
    );

    if (existingItemIndex >= 0) {
      // if it exists, update the quantity
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      // Add it as a new item
      user.cart.push({ productId, quantity });
    }

    await user.populate("cart.productId", "name price image");

    const enrichedCart = user.cart.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      image: item.productId.image,
      price: item.productId.price,
      quantity: item.quantity,
      totalPrice: item.quantity * item.productId.price,
    }));

    await user.save();
    res
      .status(200)
      .json({ message: "Product added to cart", cart: enrichedCart });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const removeFromcart = async (req, res) => {
  try {
    const userId = req.loggedInUser._id;
    const user = await User.findById(userId);
    const productId = req.params.productId;
    const isProductExists = user.cart.some(
      (item) => item.productId.toString() === productId.toString()
    );
    if (!isProductExists) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );
    await user.save();
    res
      .status(200)
      .json({ message: "Item removed from cart", cart: user.cart });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.loggedInUser._id;
    const user = await User.findById(userId);
    user.cart = [];
    user.save();
    res.status(200).json({ cart: user.cart });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { addToCart, getUserCart, removeFromcart, clearCart };
