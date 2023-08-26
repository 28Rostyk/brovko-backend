const express = require("express");
const ratingRouter = express.Router();

const { addRating } = require("../../controller");

const { authenticate } = require("../../midlewares");

ratingRouter.post("/", authenticate, addRating);
// ordersRouter.get("/auth", authenticate, getAllOrdersAuth);

module.exports = ratingRouter;