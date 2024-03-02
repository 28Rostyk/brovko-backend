const { ctrlWrapper } = require("../../helpers");
const { Feedback } = require("../../models");

const updateFeedbackStatus = async (req, res) => {
  const { status } = req.body;
  const { feedbackId } = req.params;

  // console.log("status :>> ".bgMagenta, status);
  // console.log("feedbackId :>> ".bgMagenta, feedbackId);
  // console.log("req.body :>> ".bgMagenta, req.body);

  //   if (!status || !feedbackId) {
  //     return res.status(400).json({ message: "BAD REQUEST" });
  //   }

  try {
    const feedback = await Feedback.findOneAndUpdate(
      { _id: feedbackId },
      { $set: { status: status } },
      { new: true }
    );

    // console.log("feedbacks :>> ", feedback);

    res.status(200).json({ feedback: feedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateFeedbackStatus: ctrlWrapper(updateFeedbackStatus) };
