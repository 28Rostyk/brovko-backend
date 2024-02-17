const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const {
  ACCESS_SECRET_KEY,
  REFRESH_SECRET_KEY,
  FRONTEND_URL,
  ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_LIFE,
} = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;

  const payload = {
    id,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_LIFE,
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: REFRESH_TOKEN_LIFE,
  });
  await User.findByIdAndUpdate(id, { accessToken, refreshToken });
  res.redirect(
    `${FRONTEND_URL}auth/temp?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
};

module.exports = { googleAuth };
