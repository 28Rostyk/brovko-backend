const { ctrlWrapper } = require("../../helpers");
const { Reviews } = require("../../models");

const getReviewsByStatus = async (req, res) => {
  const { status, page = 1, limit = 10 } = req.params; // реагує лише на значення "new", "approved" і "rejected"
  console.log("{status, page, limit} :>> ".magenta, { status, page, limit });

  let approvedValue;
  let approvedByValue;

  switch (status) {
    case "new":
      approvedValue = false;
      approvedByValue = "";
      break;

    case "approved":
      approvedValue = true;
      approvedByValue = { $ne: "" };
      break;

    case "rejected":
      approvedValue = false;
      approvedByValue = { $ne: "" };
      break;

    default:
      approvedValue = false;
      approvedByValue = "";
  }

  try {
    const allReviews = await Reviews.aggregate([
      { $unwind: "$comments" }, // Розгортає масив коментарів
      { $unwind: "$comments.text" },

      {
        $lookup: {
          from: "products",
          let: { productId: "$productId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: [{ $toString: "$_id" }, "$$productId"] },
              },
            },
            { $project: { name: 1 } },
          ],
          as: "productInfo",
        },
      },
      {
        $project: {
          _id: 0,
          commentId: "$comments._id",
          textId: "$comments.text._id",
          productId: "$productId",
          status: "$comments.text.status",
          owner: "$comments.owner",
          text: "$comments.text.text",
          createdAt: "$comments.text.createdAt",
          reviewURL: "$comments.text.reviewURL",
          productName: { $arrayElemAt: ["$productInfo.name", 0] },
        },
      },
      {
        $match: {
          "status.approved": approvedValue,
          "status.approvedBy.userId": approvedByValue,
        },
      },
      // { $skip: Number(skip) },
      // { $limit: Number(limit) },
      { $sort: { createdAt: -1 } },
    ]);

    if (!allReviews) {
      // console.log("REVIEWS NOT FOUND");
      return res.status(404).json({ error: "Reviews not found" });
    }

    const totalPages = Math.ceil(allReviews.length / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const reviews = allReviews.slice(startIndex, endIndex);

    console.log(
      "reviews :>> ".bgMagenta,
      `${JSON.stringify(reviews, null, 2)}`.yellow
    );
    return res.status(200).json({ totalPages, reviews });
  } catch (error) {
    console.log(error.red);
    return res.status(500).json({ error: "Server error" });
  }
};

// getReviewsByStatus();

module.exports = { getReviewsByStatus: ctrlWrapper(getReviewsByStatus) };
