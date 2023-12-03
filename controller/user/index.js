const { ctrlWrapper } = require("../../helpers");

const { current } = require("./current");
const { login } = require("./login");
const { logout } = require("./logout");
const { register } = require("./register");
const { googleAuth } = require("./googleAuth");
const { refreshToken } = require("./refreshToken");
const { forgotPassword } = require("./forgotPassword");
const { resetPassword } = require("./resetPassword");
const { resetPasswordVerify } = require("./resetPasswordVerify");
const { userUpdate } = require("./userUpdate");
const { updateAvatars } = require("./updateAvatar");
const { getUserByEmail } = require("./getUserByEmail");
const { updateUserStatus } = require("./updateUserStatus");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  googleAuth: ctrlWrapper(googleAuth),
  refreshToken: ctrlWrapper(refreshToken),
  forgotPassword: ctrlWrapper(forgotPassword),
  resetPassword: ctrlWrapper(resetPassword),
  resetPasswordVerify: ctrlWrapper(resetPasswordVerify),
  userUpdate: ctrlWrapper(userUpdate),
  updateAvatars: ctrlWrapper(updateAvatars),
  getUserByEmail: ctrlWrapper(getUserByEmail),
  updateUserStatus: ctrlWrapper(updateUserStatus),
};
