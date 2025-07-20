const express = require("express");
const { userAuth } = require("../middlewares/user-auth");
const { placeOrder } = require("../controllers/order-controller");

const orderRouter = express.Router();

orderRouter.post("/place", userAuth, placeOrder);

module.exports = orderRouter;
