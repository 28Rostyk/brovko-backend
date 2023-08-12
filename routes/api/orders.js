const express = require("express");
const ordersRouter = express.Router();

const { addOrder, getAllOrdersAuth } = require("../../controller");
const { authenticate } = require("../../midlewares");

ordersRouter.post("/", addOrder);
ordersRouter.get("/auth", authenticate, getAllOrdersAuth);

module.exports = ordersRouter;
