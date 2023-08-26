const { Products } = require("../../models/products");
const { Rating } = require("../../models/rating");
const { ctrlWrapper } = require("../../utils");
// const mongoose = require("mongoose");

const addRating = async (req, res) => {
  const userId = req.user.id; // Припустимо, що у вас є механізм авторизації та req.user містить інформацію про користувача
  const productId = req.body.productId;
  const newRating = req.body.rating;

  try {
    const product = await Products.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let ratingDocument = await Rating.findOne({ productId });

    if (ratingDocument) {
      // Перевірка, чи користувач вже додавав рейтинг для цього товару
      const userHasRated = ratingDocument.ratedBy.some(
        (user) => user.userId.toString() === userId
      );

      if (userHasRated) {
        return res
          .status(400)
          .json({ message: "You have already rated this product" });
      }

      // Оновлення рейтингу та додавання даних користувача в масив
      const allRatingsForProduct = await Rating.find({ productId });

      const totalRating = allRatingsForProduct.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );

      const newAverageRating =
        (totalRating + newRating) / (allRatingsForProduct.length + 1);

      ratingDocument.rating = newAverageRating;
      ratingDocument.ratedBy.push({
        userId: userId,
        name: req.user.name,
        email: req.user.email,
      });
      await ratingDocument.save();
    } else {
      // Створення нового рейтингу, якщо він не існує
      ratingDocument = new Rating({
        productId: productId,
        rating: newRating,
        ratedBy: [
          {
            userId: userId,
            name: req.user.name,
            email: req.user.email,
          },
        ],
      });
      await ratingDocument.save();
    }

    return res
      .status(200)
      .json({ message: "Rating updated/added successfully" });
  } catch (error) {
    console.error("Error updating/adding rating:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addRating: ctrlWrapper(addRating),
};
