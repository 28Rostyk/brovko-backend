const { Feedback, User } = require("../../models");
const { schemas } = require("../../models/feedback");
const { ctrlWrapper } = require("../../helpers");

const createFeedback = async (feedbackData) => {
  let isLogin = false;
  const user = await User.findOne({ email: feedbackData.email });
  if (user) {
    isLogin = true;
  }

  const newFeedback = new Feedback({
    ...feedbackData,
    isLogin: isLogin,
    user: user ? user.toObject() : null,
  });
  await newFeedback.save();

  return { status: "success", message: "Зворотний зв'язок успішно додано" };
};

const addFeedback = async (req, res) => {
  const body = req.body;

  // console.log("BODY :>> ".bgMagenta, body);

  try {
    // Перевірка валідації за допомогою Joi
    const { error } = schemas.addSchema.validate(body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Створення зворотного зв'язку
    const response = await createFeedback(body);

    res.status(201).json({
      status: response.status,
      message: response.message,
    });
  } catch (error) {
    console.error("Помилка у контролері: ", error.message);
    res
      .status(500)
      .json({ message: "Помилка при додаванні зворотного зв'язку" });
  }
};

module.exports = {
  addFeedback: ctrlWrapper(addFeedback),
};
