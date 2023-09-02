const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

const { HttpError } = require("../../helpers");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "2m" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.status(201).json({
    accessToken,
    refreshToken,
    user: {
      email: user.email,
      name: user.name,
      _id: user._id,
      birthday: user.birthday,
      phone: user.phone,
      favoriteOrders: user.favoriteOrders,
    },
  });
};

module.exports = login;
