const { Reviews } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const addReviews = async (req, res) => {
  const userId = req.user.id;
  const productId = req.body.productId;
  const newText = req.body.text;

  try {
    let review = await Reviews.findOne({ productId });

    if (!review) {
      // Якщо відгук для цього товару ще не існує, створіть новий
      review = new Reviews({
        productId: productId,
        comments: [
          {
            text: [newText],
            owner: {
              userId: userId,
              name: req.user.name,
              email: req.user.email,
            },
          },
        ],
      });
    } else {
      // Якщо відгук вже існує, знайдіть коментар цього користувача і додайте до нього новий текст
      const userComment = review.comments.find(
        (comment) => comment.owner.userId.toString() === userId
      );

      if (userComment) {
        userComment.text.push(newText);
      } else {
        // Якщо користувач ще не залишав коментарів до цього товару, створіть новий коментар
        review.comments.push({
          text: [newText],
          owner: {
            userId: userId,
            name: req.user.name,
            email: req.user.email,
          },
        });
      }
    }

    await review.save();
    return res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addReviews: ctrlWrapper(addReviews),
};
