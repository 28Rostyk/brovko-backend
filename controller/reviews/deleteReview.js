const { ctrlWrapper } = require("../../helpers");
const { Reviews } = require("../../models");

const deleteReview = async (req, res) => {
  const { productId, commentId, textId } = req.query;

  if (!productId || !commentId || !textId) {
    res.status(400).json({ message: "Bad Request" });
  }

  try {
    const result = await Reviews.updateOne(
      { productId: productId, "comments._id": commentId },
      { $pull: { "comments.$.text": { _id: textId } } },
      { new: true }
    );

    if (result) {
      console.log("Знайдений текст видалено:".bgBrightBlue.yellow, result);
    } else {
      console.log("Текст не знайдено для видалення");
    }
    res.status(200).json({ message: "Коментар успішно видалено" });
  } catch (error) {
    console.error("Error deleting field:", error);
  }
};

module.exports = { deleteReview: ctrlWrapper(deleteReview) };
