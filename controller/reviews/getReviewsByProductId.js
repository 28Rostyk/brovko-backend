const { ctrlWrapper } = require("../../helpers");
const { Reviews } = require("../../models");
require("colors");

const getReviewsByProductId = async (req, res) => {
  const { productId } = req.params;
  const { sortOrder = "desc" } = req.query;

  try {
    const reviews = await Reviews.aggregate([
      { $match: { productId } },
      { $unwind: "$comments" },
      { $unwind: "$comments.text" },
      { $sort: { "comments.text.createdAt": sortOrder === "asc" ? 1 : -1 } },
      {
        $group: {
          _id: "$_id",
          productId: { $first: "$productId" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          comments: { $push: "$comments" },
        },
      },
      { $sort: { createdAt: sortOrder === "asc" ? 1 : -1 } }, // Якщо потрібно сортування по даті від новіших до старіших для самого відгуку
    ]);

    if (!reviews) {
      return res
        .status(404)
        .json({ error: "Reviews not found for the specified productId" });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error.red);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getReviewsByProductId: ctrlWrapper(getReviewsByProductId) };
