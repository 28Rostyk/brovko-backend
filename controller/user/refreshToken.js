const jwt = require("jsonwebtoken");
const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const {
  ACCESS_SECRET_KEY,
  REFRESH_SECRET_KEY,
  ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_LIFE,
} = process.env;

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

    const newAccessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: ACCESS_TOKEN_LIFE,
    });
    const newRefreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_LIFE,
    });

    isExist.refreshToken = newRefreshToken;
    isExist.accessToken = newAccessToken;
    await isExist.save();

    res.status(201).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch {
    next(HttpError(403, "refreshToken invalid"));
  }
};

module.exports = { refreshToken };
