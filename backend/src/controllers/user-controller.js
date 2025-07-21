const User = require("../models/user-model");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({ data: allUsers });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.loggedInUser._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const sortedOrders = [...user.orders].sort(
      (a, b) => new Date(b.placedAt) - new Date(a.placedAt)
    );
    const userWithSortedOrders = {
      ...user.toObject(),
      orders: sortedOrders,
    };
    res.status(200).json({ data: userWithSortedOrders });
  } catch (err) {
    res.status(401).json({ error: "Invalid session" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const dataToEdit = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      dataToEdit,
      {
        returnDocument: "after",
      }
    );
    res.status(200).json({ message: "User updated", data: updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { updateUser, getAllUsers, getCurrentUser };
