const jwt = require("jsonwebtoken");
const { HttpError } = require("../../helpers");
const User = require("../../models");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const refreshToken = async (req, res, next) => {
  const { refreshToken: token } = req.body;
  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
    const isExist = await User.findOne({ refreshToken: token });
    if (!isExist) {
      next(HttpError(403, "user not exist"));
    }
    const payload = {
      id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "2m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(201).json({
      accessToken,
      refreshToken,
    });
  } catch {
    next(HttpError(403, "refreshToken invalid"));
  }
};

module.exports = { refreshToken };
