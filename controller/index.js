const { addOrder } = require("./orders/addOrder");
const { getAllOrdersAuth } = require("./orders/getAllOrdersAuth");
const { getProducts, deleteContact } = require("./productsControllers");
const { current, login, logout, register } = require("./user");
module.exports = {
  getProducts,
  deleteContact,
  current,
  login,
  logout,
  register,
  addOrder,
  getAllOrdersAuth,
};
