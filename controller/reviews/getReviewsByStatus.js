const { ctrlWrapper } = require("../../helpers");
const { Reviews } = require("../../models");

const getReviewsByStatus = async (req, res) => {
  const { status } = req.body; // реагує лише на значення "new", "approved" і "rejected"

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
    const reviews = await Reviews.aggregate([
      { $unwind: "$comments" }, // Розгортає масив коментарів
      { $unwind: "$comments.text" },
      {
        $project: {
          _id: 0,
          commentId: "$comments.text._id",
          productId: "$productId",
          status: "$comments.text.status",
          owner: "$comments.owner",
          text: "$comments.text.text",
          reviewURL: "$comments.text.reviewURL",
        },
      },
      {
        $match: {
          "status.approved": approvedValue,
          "status.approvedBy.userId": approvedByValue,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    if (!reviews) {
      console.log("REVIEWS NOT FOUND");
      return res.status(404).json({ error: "Reviews not found" });
    }

    console.log(
      "reviews :>> ".bgMagenta,
      `${JSON.stringify(reviews, null, 2)}`.yellow
    );
    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error.red);
    return res.status(500).json({ error: "Server error" });
  }
};

// getReviewsByStatus();

module.exports = { getReviewsByStatus: ctrlWrapper(getReviewsByStatus) };
