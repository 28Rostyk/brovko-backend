const bcrypt = require("bcryptjs");
const { User } = require("../../models");

const { HttpError } = require("../../helpers");

const resetPassword = async (req, res) => {
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw HttpError(400, "The link is invalid or has expired!");
  }

  const hashPassword = await bcrypt.hash(password, 1);
  user.password = hashPassword;
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();

  return res.status(200).json({
    message: "Пароль успішно змінено",
  });
};

module.exports = { resetPassword };
