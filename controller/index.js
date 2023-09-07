const { addOrder } = require("./orders/addOrder");
const { getAllOrdersAuth } = require("./orders/getAllOrdersAuth");
const { current, login, logout, register, refreshToken } = require("./user");
const { updateDatabase } = require("./products/productsUpdate");
const { getProducts } = require("./products/getProducts");
const { findProductsByCategory } = require("./products/findProductsByCategory");
const { getCategory } = require("./category/getCategory");
const { addRating } = require("./rating/addRating");
const { getRatings } = require("./rating/getRating");
const { addProduct } = require("./products/addProduct");
const { addCategory } = require("./category/addCategory");

module.exports = {
  getProducts,
  findProductsByCategory,
  current,
  login,
  logout,
  register,
  refreshToken,
  addOrder,
  getAllOrdersAuth,
  updateDatabase,
  getCategory,
  addRating,
  getRatings,
  addProduct,
  addCategory,
};
