const { Reviews } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getReviews = async (req, res) => {
  //   const productId = req.params.productId;

  try {
    const reviews = await Reviews.find();

    if (!reviews) {
      return res
        .status(404)
        .json({ message: "Reviews not found for this product" });
    }

    return res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error getting product reviews:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getReviews: ctrlWrapper(getReviews),
};
