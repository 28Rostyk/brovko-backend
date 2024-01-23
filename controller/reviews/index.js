const { addReviews } = require("./addReviews");
const { getReviews } = require("./getReviews");
const { getReviewsByProductId } = require("./getReviewsByProductId");
const { controlReview } = require("./controlReview");

module.exports = {
  addReviews,
  getReviews,
  getReviewsByProductId,
  controlReview,
};
