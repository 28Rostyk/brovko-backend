const { Feedback } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getFeedback = async (req, res) => {
  const sort = req.params.sort;

  if (sort !== "new" && sort !== "archived" && sort !== "all") {
    return res.status(400).json({
      message: 'крамничка приймає лише значення "new" або "archived"',
    });
  }

  const sortOption = sort === "all" ? {} : { status: sort };

  try {
    const feedback = await Feedback.find(sortOption);
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
