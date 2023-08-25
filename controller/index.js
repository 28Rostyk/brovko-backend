const { addOrder } = require("./orders/addOrder");
const { getAllOrdersAuth } = require("./orders/getAllOrdersAuth");
const {
  getProducts,
  deleteContact,
  findProductsByCategory,
  updateDatabase,
} = require("./products/productsControllers");
const { current, login, logout, register } = require("./user");
module.exports = {
  getProducts,
  deleteContact,
  findProductsByCategory,
  current,
  login,
  logout,
  register,
  addOrder,
  getAllOrdersAuth,
  updateDatabase,
};
