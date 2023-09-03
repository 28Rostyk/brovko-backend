const express = require("express");
const ordersRouter = express.Router();

const { addOrder, getAllOrdersAuth } = require("../../controller");

const { authenticate } = require("../../middlewares");

ordersRouter.post("/", addOrder);
ordersRouter.get("/auth", authenticate, getAllOrdersAuth);

module.exports = ordersRouter;
