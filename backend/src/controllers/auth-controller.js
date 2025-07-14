const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password, cart, orders } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: passwordHash,
    });
    user.save();
    res.status(201).json({ message: "User created", data: user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email does not exist");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    const displayUser = await User.findOne({ email }).select("-password");
    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        // secure: true, // only sent over HTTPS // to be used in Production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        message: "Logged in Successfully",
        data: displayUser
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const handleRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ error: "Unauthorised" });
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = await generateRefreshToken(decoded);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logged out" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { signup, login, handleRefreshToken, logout };
