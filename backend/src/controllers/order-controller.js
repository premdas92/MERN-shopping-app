const User = require("../models/user-model");

const placeOrder = async (req, res) => {
  try {
    const userId = req.loggedInUser?._id;
    const { cartItems, shippingDetails } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const order = {
      items: cartItems,
      shippingDetails,
      totalAmount,
      placedAt: new Date(),
    };
    const user = await User.findById(userId);
    user.orders.push(order);
    await user.save();
    return res
      .status(201)
      .json({ message: "Order placed successfully", order });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


module.exports = { placeOrder };
