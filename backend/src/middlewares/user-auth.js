const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const userAuth = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(401);
    }
    const decodedObj = await jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    const { _id } = decodedObj;
    const loggedInUser = await User.findById(_id);
    if (!loggedInUser) {
      throw new Error("User not found");
    }
    req.loggedInUser = loggedInUser;
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { userAuth };
