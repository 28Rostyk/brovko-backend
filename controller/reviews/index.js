const { addReviews } = require("./addReviews");
const { getReviews } = require("./getReviews");
const { getReviewsByProductId } = require("./getReviewsByProductId");
const { controlReview } = require("./controlReview");
const { getReviewsByStatus } = require("./getReviewsByStatus");
const { deleteReview } = require("./deleteReview");

module.exports = {
  addReviews,
  getReviews,
  getReviewsByProductId,
  controlReview,
  getReviewsByStatus,
  deleteReview,
};
