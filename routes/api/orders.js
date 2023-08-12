const express = require("express");
const ordersRouter = express.Router();

const { addOrder } = require("../../controller");

ordersRouter.post("/", addOrder);

module.exports = ordersRouter;
