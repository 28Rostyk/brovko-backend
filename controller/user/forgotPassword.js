const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const { HttpError, sendEmail } = require("../../helpers");

const { RESET_SECRET_KEY, FRONTEND_URL } = process.env;

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "Email is wrong");
  }

  const resetToken = jwt.sign({ email }, RESET_SECRET_KEY, { expiresIn: "1h" });
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 3600000;
  await user.save();

  const resetEmail = {
    to: email,
    subject: "Відновлення паролю",
    html:
      `<p>Вітаємо, друже Бровка!.</p>` +
      `<p>Ви отримали цього листа, тому що Ви відправили запит на відновлення пароля для вашого облікового запису.</p>` +
      `<p>Будь ласка, <a href="${FRONTEND_URL}auth/reset-password/${resetToken}">перейдіть за цим посиланням</a>, щоб завершити процес відновлення пароля.</p>` +
      `<p>Якщо Ви не потребуєте відновлення паролю, проігноруйте цього листа, ваш пароль не буде змінено.</p>`,
    // text:
    //   "Ви отримали цього листа, тому що Ви відправили запит на відновлення пароля для вашого облікового запису.\n\n" +
    //   "Будь ласка, перейдіть за посиланням, щоб завершити процес відновлення пароля:\n\n" +
    //   `<a href="${BASE_URL}/api/user/reset-password/token=${resetToken}">${BASE_URL}/api/user/reset-password/token=${resetToken}</a>` +
    //   "\n\n" +
    //   "Якщо Ви не потребуєте відновлення паролю, проігноруйте цього листа, ваш пароль не буде змінено.\n",
  };

  sendEmail(resetEmail);

  res.status(201).json({
    resetToken,
    message: "Інформація зі скидання пароля успішно відправлена на ваш email",
  });
};

module.exports = { forgotPassword };
