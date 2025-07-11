const User = require("../models/user-model");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({ data: allUsers });
  } catch (err) {
    res.status(400).json({ error: err.message });
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

module.exports = { updateUser, getAllUsers };
