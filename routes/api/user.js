const express = require("express");
const userRouter = express.Router();

const { validateBody } = require("../../utils");

const {
  userValidation,
  refreshValidation,
  resetMailValidation,
  resetPasswordValidation,
} = require("../../schemas/userValidation");
const {
  googleAuth,
  refreshToken,
  register,
  login,
  current,
  logout,
  forgotPassword,
  resetPassword,
  resetPasswordVerify,
  userUpdate,
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
userRouter.get("/current", validateBody(userValidation), authenticate, current);
// userRouter.put("/update/:id", authenticate, userUpdate);
userRouter.patch("/update", authenticate, userUpdate);
userRouter.post("/logout", authenticate, logout);
userRouter.post(
  "/forgot-password",
  validateBody(resetMailValidation),
  forgotPassword
);
userRouter.get("/reset-password/:token", resetPasswordVerify);
userRouter.post(
  "/reset-password/:token",
  validateBody(resetPasswordValidation),
  resetPassword
);

module.exports = { userRouter };
