const { ctrlWrapper } = require("../../helpers");

const { current } = require("./current");
const { login } = require("./login");
const { logout } = require("./logout");
const { register } = require("./register");
const { googleAuth } = require("./googleAuth");
const { refreshToken } = require("./refreshToken");
const {forgotPassword} = require('./forgotPassword');
const {resetPassword} = require('./resetPassword');
const {resetPasswordVerify} = require('./resetPasswordVerify');

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
};
