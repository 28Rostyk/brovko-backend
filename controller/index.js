const { addOrder } = require("./orders/addOrder");
const { getAllOrdersAuth } = require("./orders/getAllOrdersAuth");
const { updateDatabase } = require("./products/productsUpdate");
const { getProducts } = require("./products/getProducts");
const { findProductsByCategory } = require("./products/findProductsByCategory");
const { current, login, logout, register } = require("./user");
const { getCategory } = require("./category/getCategory");
const { addRating } = require("./rating/addRating");
const { getRatings } = require("./rating/getRating");
const { addProduct } = require("./products/addProduct");

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
  getRatings,
  addProduct,
};
