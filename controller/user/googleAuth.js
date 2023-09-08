const jwt = require("jsonwebtoken");

const User = require("../../models");

const { SECRET_KEY } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(id, { token });
  res.redirect(`http://localhost:3000/main?token=${token}`);
};

module.exports = { googleAuth };
