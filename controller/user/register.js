const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const {
  ACCESS_SECRET_KEY,
  REFRESH_SECRET_KEY,
  ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_LIFE,
} = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    console.log("error");
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 1);

  const result = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const payload = {
    id: result._id,
  };

  // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_LIFE,
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: REFRESH_TOKEN_LIFE,
  });

  await User.findByIdAndUpdate(result._id, {
    accessToken,
    refreshToken,
  });

  const updatedUser = await User.findById(result._id);

  res.status(201).json({
    accessToken,
    refreshToken,
    user: updatedUser,
  });
};

module.exports = { register };
