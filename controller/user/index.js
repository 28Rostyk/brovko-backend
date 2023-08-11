const { ctrlWrapper } = require("../../utils");

const current = require("./current");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
};
