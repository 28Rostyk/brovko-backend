const express = require("express");
const ordersRouter = express.Router();

const { fetchOrder, getAllOrdersAuth, addOrder } = require("../../controller");
const { authenticate } = require("../../middlewares");
const { validateBody, addOrderSchema } = require("../../schemas");

ordersRouter.post("/", fetchOrder);
ordersRouter.post("/add-order", validateBody(addOrderSchema), addOrder);
ordersRouter.get("/auth", authenticate, getAllOrdersAuth);

module.exports = { ordersRouter };
