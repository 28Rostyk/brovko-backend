const { Products } = require("../../models/products");
const { Rating } = require("../../models/rating");
const { ctrlWrapper } = require("../../utils");

const addRating = async (req, res) => {
  const productId = req.body.productId;
  const newRating = req.body.rating;
  try {
    const product = await Products.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Отримати всі рейтинги для даного продукту
    const allRatings = await Rating.find({ productId });

    // Додати новий рейтинг до списку рейтингів
    allRatings.push({ rating: newRating });

    // Обчислити середнє арифметичне рейтингу
    const totalRatings = allRatings.reduce(
      (sum, rating) => sum + rating.rating,
      0
    );
    const averageRating = totalRatings / allRatings.length;

    // Оновити або створити документ рейтингу
    let ratingDocument = await Rating.findOne({ productId });

    if (ratingDocument) {
      ratingDocument.rating = newRating;
      await ratingDocument.save();
    } else {
      ratingDocument = new Rating({ productId, rating: newRating });
      await ratingDocument.save();
    }

    // Оновити середнє арифметичне в продукті
    product.averageRating = averageRating;
    await product.save();

    return res.status(200).json({ message: "Rating updated successfully" });
  } catch (error) {
    console.error("Error updating rating:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  addRating: ctrlWrapper(addRating),
};
