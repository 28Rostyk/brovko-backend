const { getProducts, deleteContact } = require("./productsControllers");
const { current, login, logout, register } = require("./user");
module.exports = {
  getProducts,
  deleteContact,
  current,
  login,
  logout,
  register,
};
