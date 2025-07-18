const express = require("express");
const {
  addToCart,
  getUserCart,
  clearCart,
  removeFromcart,
  updateCartItem,
} = require("../controllers/cart-controller");
const { userAuth } = require("../middlewares/user-auth");

const cartRouter = express.Router();

cartRouter.post("/", userAuth, addToCart);
cartRouter.get("/", userAuth, getUserCart);
cartRouter.delete("/clear", userAuth, clearCart);
cartRouter.put("/:productId", userAuth, updateCartItem);
cartRouter.delete("/:productId", userAuth, removeFromcart);

module.exports = cartRouter;
