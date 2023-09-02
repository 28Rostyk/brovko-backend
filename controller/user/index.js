const { ctrlWrapper } = require("../../utils");

const current = require("./current");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const googleAuth = require("./googleAuth");
const refreshToken = require('./refreshToken')

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  googleAuth: ctrlWrapper(googleAuth),
  refreshToken: ctrlWrapper(refreshToken),
};
