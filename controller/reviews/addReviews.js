const { Reviews } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const cloudinary = require("cloudinary").v2;

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET_KEY } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET_KEY,
});

const addReviews = async (req, res) => {
  const userId = req.user.id;
  const productId = req.body.productId;
  const newText = req.body.text;
  const { path: tempUpload, filename } = req.file;
  const reviewName = `${userId}${filename}`;

  if (!req.file) {
    return res.status(400).json({ message: "File is required" });
  }

  if (!productId || productId.trim() === "") {
    return res.status(400).json({ message: "ProductId is required" });
  }

  if (!newText || newText.trim() === "") {
    return res.status(400).json({ message: "Text is required" });
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(tempUpload, {
    folder: "reviews",
    public_id: reviewName,
    width: 250,
    height: 250,
    crop: "fill",
  });

  const reviewURL = cloudinaryResponse.secure_url;

  try {
    let review = await Reviews.findOne({ productId });

    if (!review) {
      // Якщо відгук для цього товару ще не існує, створіть новий
      review = new Reviews({
        productId: productId,
        comments: [],
      });
    }

    // Знайдіть коментар цього користувача відповідно до userId
    const userComment = review.comments.find(
      (comment) => comment.owner.userId.toString() === userId
    );

    if (userComment) {
      // Оновлення масиву об'єктів з текстом та датою створення
      userComment.text.push({
        text: newText,
        reviewURL: reviewURL,
        createdAt: new Date(),
      });
    } else {
      // Якщо користувач ще не залишав коментарів до цього товару, створіть новий коментар
      review.comments.push({
        text: [{ text: newText, reviewURL: reviewURL, createdAt: new Date() }],
        owner: {
          userId: userId,
          name: req.user.name,
          email: req.user.email,
        },
      });
    }

    // Збережіть змінений відгук
    await review.save();
    return res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  addReviews: ctrlWrapper(addReviews),
};
