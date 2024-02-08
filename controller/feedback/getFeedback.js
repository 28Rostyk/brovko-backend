const { Feedback } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json(feedback);
  } catch (error) {
    console.error("Помилка у контролері: ", error.message);
    res
      .status(500)
      .json({ message: "Помилка при отриманні зворотного зв'язку" });
  }
};

module.exports = {
  getFeedback: ctrlWrapper(getFeedback),
};
