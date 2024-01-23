const { ctrlWrapper } = require("../../helpers");
const { Reviews } = require("../../models");

const controlReview = async (req, res) => {
  try {
    const { firstName, middleName, lastName, email } = req.user;
    const { reviewByProductId, commentId, textId } = req.body;

    console.log("USER :>> ".bgMagenta, {
      firstName,
      middleName,
      lastName,
      email,
    });
    console.log("REVIEW-ID's :>>".bgBlue, {
      reviewByProductId,
      commentId,
      textId,
    });

    // шукаємо усі коментарі від продукту одного юзера
    const { comments } = await Reviews.findOne(
      {
        _id: reviewByProductId,
        "comments._id": commentId,
      },
      {
        "comments.$": 1,
      }
    );

    console.log("userComments :>> ".yellow, `${comments}`.yellow);

    console.log("discovery :>> ".bgGreen, `${comments[0].text}`.brightGreen);
    console.log("typeof comments[0].text :>> ", typeof comments[0].text);

    const response = comments[0].text.find(
      (el) => el._id.toString() === textId
    );

    console.log("response :>> ".bgBlue, `${response}`.brightBlue);

    // Знаходження індексу коментаря та тексту в масиві
    const review = await Reviews.findById(reviewByProductId);
    const commentIndex = review.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );
    const textIndex = review.comments[commentIndex].text.findIndex(
      (text) => text._id.toString() === textId
    );

    // Оновлення статусу
    const updatedDocument = await Reviews.findByIdAndUpdate(
      reviewByProductId,
      {
        $set: {
          [`comments.${commentIndex}.text.${textIndex}.status`]:
            "NEW GODNESS STATUS",
        },
      },
      {
        new: true,
      }
    );

    if (updatedDocument) {
      const response = updatedDocument.comments[commentIndex].text[textIndex];
      console.log("Status updated successfully", `${response}`.magenta);
    } else {
      console.log("No document was modified");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { controlReview: ctrlWrapper(controlReview) };
