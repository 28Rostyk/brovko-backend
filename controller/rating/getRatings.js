const { Rating } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getRatings = async (req, res) => {
  const productId = req.params.productId;

  try {
    const rating = await Rating.findOne({ productId });

    if (!rating) {
      return res
        .status(404)
        .json({ message: "Rating not found for this product" });
    }

    return res
      .status(200)
      .json({ rating: rating.rating, ratedBy: rating.ratedBy });
  } catch (error) {
    console.error("Error getting product rating:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getRatings: ctrlWrapper(getRatings),
};
