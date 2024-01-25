const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const resetPasswordVerify = async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() },
  });
  if (!user) {
    throw HttpError(401, "The link is invalid or has expired!");
  }
  res.status(201).json({
    message: "Введіть новий пароль.",
  });
};

module.exports = { resetPasswordVerify };
