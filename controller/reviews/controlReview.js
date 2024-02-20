const { ctrlWrapper } = require("../../helpers");
const { Reviews } = require("../../models");

const controlReview = async (req, res) => {
  try {
    const { id, firstName, middleName, lastName, email } = req.user;
    const { productId, commentId, textId, approved } = req.body;

    // перевіряємо вхідні дані з запиту
    console.log("USER :>> ".bgMagenta, {
      id,
      firstName,
      middleName,
      lastName,
      email,
    });
    console.log("REVIEW-ID's :>>".bgBlue, {
      productId,
      commentId,
      textId,
    });

    // Пошук індексу коментаря та тексту в масиві
    const review = await Reviews.findOne({ productId });
    console.log("review :>> ".bgBrightBlue, review);

    const commentIndex = review.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );
    console.log("commentIndex :>> ".bgBrightBlue, commentIndex);

    const textIndex = review.comments[commentIndex].text.findIndex(
      (text) => text._id.toString() === textId
    );

    // Оновлення статусу
    const updatedDocument = await Reviews.findOneAndUpdate(
      { productId },
      {
        $set: {
          [`comments.${commentIndex}.text.${textIndex}.status`]: {
            approved: approved,
            approvedBy: {
              userId: id,
              userName: firstName + " " + lastName,
              userEmail: email,
            },
            approvedAt: new Date(),
          },
        },
      },
      {
        new: true,
      }
    );

    if (updatedDocument) {
      const response = updatedDocument.comments[commentIndex].text[textIndex];
      console.log("Status updated successfully", `${response}`.magenta);

      res.status(200).json(response);
    } else {
      console.log("No document was modified");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { controlReview: ctrlWrapper(controlReview) };
