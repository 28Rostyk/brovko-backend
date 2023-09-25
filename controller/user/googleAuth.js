const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;

  const payload = {
    id,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "2d" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });
  await User.findByIdAndUpdate(id, { accessToken, refreshToken });
  res.redirect(`http://localhost:3000/main?token=${token}`);
};

module.exports = { googleAuth };
