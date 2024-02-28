// додавання і отримання замовлення
const { fetchOrder, getAllOrdersAuth, addOrder } = require("./orders");
// додавання і отримання категорій
const { getCategories, addCategory, getCategoryById } = require("./category");
// додавання товару, отримання всіх товарів, пошук товару за категорією
const {
  addProduct,
  getProductsByCategory,
  findProductById,
  getAllProducts,
  removeProducts,
  getProductsByKeywords,
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
  updateAvatars,
} = require("./user");
// додати рейтинг товару, отримати рейтинги всіх товарів
const { addRating, getRatings } = require("./rating");

// додавання і отримування відгуків до товарів

const {
  addReviews,
  getReviews,
  getReviewsByProductId,
  controlReview,
  getReviewsByStatus,
} = require("./reviews");

// Генерація Ключа

const { generateSignature } = require("./generateSignature");

const {
  addLocations,
  getAllLocations,
  removeLocation,
  updateLocation,
  getLocationById,
} = require("./location");

const {
  addFeedback,
  getFeedback,
  updateFeedbackStatus,
} = require("./feedback");

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
  addCategory,
  getCategories,
  getCategoryById,
  addRating,
  getRatings,
  getReviews,
  getReviewsByProductId,
  getReviewsByStatus,
  addReviews,
  controlReview,
  addProduct,
  removeProducts,
  getProducts,
  generateSignature,
  userUpdate,
  updateAvatars,
  getProductsByKeywords,
  addLocations,
  getLocationById,
  getAllLocations,
  removeLocation,
  updateLocation,
  addFeedback,
  getFeedback,
  updateFeedbackStatus,
};
