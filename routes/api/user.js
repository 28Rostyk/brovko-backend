const express = require("express");
const userRouter = express.Router();

const { validateBody } = require("../../utils");

const {
  userValidation,
  refreshValidation,
} = require("../../schemas/userValidation");
const {
  googleAuth,
  refreshToken,
  register,
  login,
  current,
  logout,
} = require("../../controller/user");
const { authenticate, passport } = require("../../middlewares");

userRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

userRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuth
);

userRouter.post("/refresh", validateBody(refreshValidation), refreshToken);

userRouter.post("/register", validateBody(userValidation), register);
userRouter.post("/login", validateBody(userValidation), login);
userRouter.get("/current", authenticate, current);
userRouter.post("/logout", authenticate, logout);

module.exports = { userRouter };
