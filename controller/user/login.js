const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const { HttpError } = require("../../helpers");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log("user", user);

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

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "2d" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.status(201).json({
    accessToken,
    refreshToken,
    user,
    // user: {
    //   _id: user._id,
    //   firstName: user.firstName,
    //   middleName: user.middleName,
    //   lastName: user.lastName,
    //   birthday: user.birthday,
    //   email: user.email,
    //   phone: user.phone,
    //   city: user.city,
    //   street: user.street,
    //   buildingNumber: user.buildingNumber,
    //   flat: user.flat,
    //   favoriteOrders: user.favoriteOrders,
    // },
  });
};

module.exports = { login };
