const { ctrlWrapper } = require("../../helpers");
const { Reviews } = require("../../models");

const deleteReview = async (req, res) => {
  const { productId, commentId, textId } = req.body;

  if (!productId || !commentId || !textId) {
    res.status(400).json({ message: "Bad Request" });
  }

  try {
    const result = await Reviews.updateOne(
      { productId: productId, "comments.commentId": commentId },
      { $pull: { "comments.$.text": { _id: textId } } }
    );

    console.log("Field deleted successfully:".bgBrightGreen.black, result);
    res.status(204).json({ result });
  } catch (error) {
    console.error("Error deleting field:", error);
  }

  console.log("data :>> ".bgMagenta, req.body);
};

module.exports = { deleteReview: ctrlWrapper(deleteReview) };
