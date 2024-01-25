const { addReviews } = require("./addReviews");
const { getReviews } = require("./getReviews");
const { getReviewsByProductId } = require("./getReviewsByProductId");
const { controlReview } = require("./controlReview");
const { getReviewsByStatus } = require("./getReviewsByStatus");

module.exports = {
  addReviews,
  getReviews,
  getReviewsByProductId,
  controlReview,
  getReviewsByStatus,
};
