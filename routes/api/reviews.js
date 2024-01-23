const express = require("express");
const reviewsRouter = express.Router();

const {
  addReviews,
  getReviews,
  getReviewsByProductId,
  controlReview,
} = require("../../controller");

const { authenticate, upload } = require("../../middlewares");

reviewsRouter.post("/", authenticate, upload.array("review", 5), addReviews);
reviewsRouter.get("/", getReviews);
reviewsRouter.get("/:productId", getReviewsByProductId);
reviewsRouter.patch("/control", authenticate, controlReview);

module.exports = { reviewsRouter };
