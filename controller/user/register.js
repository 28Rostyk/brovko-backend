const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
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

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(result._id, { token });

  res.status(201).json({
    user: {
      email: result.email,
      token,
    },
  });
};

module.exports = register;
