const express = require("express");
const {
  getAllUsers,
  updateUser,
  getCurrentUser,
} = require("../controllers/user-controller");
const { userAuth } = require("../middlewares/user-auth");
const adminAuth = require("../middlewares/admin-auth");

const userRouter = express.Router();

userRouter.get("/", userAuth, adminAuth, getAllUsers);
userRouter.patch("/:id", userAuth, updateUser);
userRouter.get("/current", userAuth, getCurrentUser);

module.exports = userRouter;
