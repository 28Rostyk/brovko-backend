const express = require("express");
const reviewsRouter = express.Router();

const {
  addReviews,
  getReviews,
  getReviewsByProductId,
} = require("../../controller");

const { authenticate, upload } = require("../../middlewares");

reviewsRouter.post("/", authenticate, upload.array("review", 5), addReviews);
reviewsRouter.get("/", getReviews);
reviewsRouter.get("/:productId", getReviewsByProductId);

module.exports = { reviewsRouter };
