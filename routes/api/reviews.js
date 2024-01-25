const express = require("express");
const reviewsRouter = express.Router();

const {
  addReviews,
  getReviews,
  getReviewsByProductId,
  getReviewsByStatus,
  controlReview,
} = require("../../controller");

const { authenticate, upload } = require("../../middlewares");

reviewsRouter.post("/", authenticate, upload.array("review", 5), addReviews);
reviewsRouter.get("/", getReviews);
reviewsRouter.get("/:productId", getReviewsByProductId);
reviewsRouter.patch("/control", authenticate, controlReview);
reviewsRouter.patch("/by-status", authenticate, getReviewsByStatus);

module.exports = { reviewsRouter };
