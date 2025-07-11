const express = require("express");
const {
  signup,
  login,
  handleRefreshToken,
  logout,
} = require("../controllers/auth-controller");

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/refresh-token", handleRefreshToken);
authRouter.post("/logout", logout);

module.exports = authRouter;
