// додавання і отримання замовлення
const { fetchOrder, getAllOrdersAuth, addOrder } = require("./orders");
// додавання і отримання категорій
const { getCategories, addCategory } = require("./category");
// додавання товару, отримання всіх товарів, пошук товару за категорією
const {
  addProduct,
  findProductsByCategory,
  getProducts,
} = require("./products");
// реєстрація, логінізація, вихід з логіну, оновлення токена, поточний користувач
const {
  current,
  login,
  logout,
  register,
  refreshToken,
  forgotPassword,
  resetPassword,
  resetPasswordVerify,
  userUpdate,
} = require("./user");
// додати рейтинг товару, отримати рейтинги всіх товарів
const { addRating, getRatings } = require("./rating");

// додавання і отримування відгуків до товарів

const { addReviews, getReviews } = require("./reviews");

// Прмусове оновлення БД

const { updateDatabase } = require("./database");

// Генерація Ключа

const { generateSignature } = require("./generateSignature");

module.exports = {
  getProducts,
  findProductsByCategory,
  current,
  login,
  logout,
  register,
  refreshToken,
  forgotPassword,
  resetPassword,
  resetPasswordVerify,
  fetchOrder,
  getAllOrdersAuth,
  addOrder,
  getCategories,
  addRating,
  getRatings,
  addReviews,
  getReviews,
  addProduct,
  addCategory,
  updateDatabase,
  generateSignature,
  userUpdate,
};
