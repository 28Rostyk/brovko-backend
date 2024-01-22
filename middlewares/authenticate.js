const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { User } = require("../models");

const { ACCESS_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);

    console.log("ID into AUTHENTICATE ::".yellow, id);

    const user = await User.findById(id);
    if (!user || !user.accessToken) {
      next(HttpError(401));
    }
    req.user = user;

    // передаємо в req сам токен
    req.token = token;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = { authenticate };
