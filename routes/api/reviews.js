const express = require("express");
const reviewsRouter = express.Router();

const { addReviews, getReviews } = require("../../controller");

const { authenticate } = require("../../middlewares");

reviewsRouter.post("/", authenticate, addReviews);
reviewsRouter.get("/", getReviews);

module.exports = { reviewsRouter };
