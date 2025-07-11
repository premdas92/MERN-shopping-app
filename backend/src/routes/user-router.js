const express = require("express");
const { getAllUsers, updateUser } = require("../controllers/user-controller");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.patch("/:id", updateUser);

module.exports = userRouter;
