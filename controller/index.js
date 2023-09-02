const { addOrder } = require("./orders/addOrder");
const { getAllOrdersAuth } = require("./orders/getAllOrdersAuth");
const {
  getProducts,
  findProductsByCategory,
  updateDatabase,
} = require("./products/productsControllers");
const { current, login, logout, register, refreshToken } = require("./user");
const { getCategory } = require("./category/getCategory");
const { addRating } = require("./rating/addRating");
const { getRatings } = require("./rating/getRating");
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
};
