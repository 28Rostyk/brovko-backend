// додавання і отримання замовлення
const { fetchOrder, getAllOrdersAuth } = require("./orders");
// додавання і отримання категорій
const { getCategories, addCategory } = require("./category");
// додавання товару, отримання всіх товарів, пошук товару за категорією
const {
  addProduct,
  findProductsByCategory,
  getProducts,
} = require("./products");
// реєстрація, логінізація, вихід з логіну, оновлення токена, поточний користувач
const { current, login, logout, register, refreshToken } = require("./user");
// додати рейтинг товару, отримати рейтинги всіх товарів
const { addRating, getRatings } = require("./rating");

const { updateDatabase } = require("./database");

module.exports = {
  getProducts,
  findProductsByCategory,
  current,
  login,
  logout,
  register,
  refreshToken,
  fetchOrder,
  getAllOrdersAuth,
  getCategories,
  addRating,
  getRatings,
  addProduct,
  addCategory,
  updateDatabase,
};
