const express = require("express");
const reviewsRouter = express.Router();

const { addReviews } = require("../../controller");

const { authenticate } = require("../../middlewares");

reviewsRouter.post("/", authenticate, addReviews);
// reviewsRouter.get("/:productId", getRatings);

module.exports = { reviewsRouter };
