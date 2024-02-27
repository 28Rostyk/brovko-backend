const { Feedback } = require("../models");

async function updateForUser(userId, updatedUserData) {
  console.log(userId);
  try {
    const feedbacksToUpdate = await Feedback.find({ "user._id": userId });

    for (const feedback of feedbacksToUpdate) {
      feedback.user = updatedUserData;
      await feedback.save();
    }

    console.log(`Updated feedbacks for user ${userId}`);
  } catch (error) {
    console.error("Error updating feedbacks for user:", error);
    throw error;
  }
}

module.exports = { updateForUser };
