// додавання і отримання замовлення
const { fetchOrder, getAllOrdersAuth, addOrder } = require("./orders");
// додавання і отримання категорій
const { getCategories, addCategory } = require("./category");
// додавання товару, отримання всіх товарів, пошук товару за категорією
const {
  addProduct,
  getProductsByCategory,
  findProductById,
  getAllProducts,
  removeProducts,
  getProductsByKeywords,
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
  updateAvatars,
} = require("./user");
// додати рейтинг товару, отримати рейтинги всіх товарів
const { addRating, getRatings } = require("./rating");

// додавання і отримування відгуків до товарів

const { addReviews, getReviews, getReviewsByProductId } = require("./reviews");

// Генерація Ключа

const { generateSignature } = require("./generateSignature");

module.exports = {
  getAllProducts,
  getProductsByCategory,
  findProductById,
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
  removeProducts,
  addCategory,
  generateSignature,
  userUpdate,
  updateAvatars,
  getProductsByKeywords,
  getReviewsByProductId,
};
