const { addOrder } = require("./orders/addOrder");
const { getAllOrdersAuth } = require("./orders/getAllOrdersAuth");
const {
  getProducts,
  findProductsByCategory,
  updateDatabase,
} = require("./products/productsControllers");
const { current, login, logout, register } = require("./user");
const { getCategory } = require("./category/getCategory");
const { addRating } = require("./rating/addRating");
module.exports = {
  getProducts,
  findProductsByCategory,
  current,
  login,
  logout,
  register,
  addOrder,
  getAllOrdersAuth,
  updateDatabase,
  getCategory,
  addRating,
};
