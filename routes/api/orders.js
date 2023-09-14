const express = require("express");
const ordersRouter = express.Router();

const { fetchOrder, getAllOrdersAuth } = require("../../controller");

const { authenticate } = require("../../middlewares");

ordersRouter.post("/", fetchOrder);
ordersRouter.get("/auth", authenticate, getAllOrdersAuth);

module.exports = { ordersRouter };
