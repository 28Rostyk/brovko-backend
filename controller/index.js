const { getProducts } = require("./productsControllers");
const { current, login, logout, register } = require("./user");
module.exports = {
  getProducts,
  current,
  login,
  logout,
  register,
};
