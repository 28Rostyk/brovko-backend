// const { updateDatabase } = require("../controller/database/updateDatabase");
const { updateDatabase } = require("./updateDatabase");
const { autoFetchCategories } = require("./autoFetchCategories");
const { autoFetchProducts } = require("./autoFetchProducts");
const { createCategory } = require("./createCategory");
const { createProduct } = require("./createProduct");
const { deleteProducts } = require("./deleteProducts");
const { createOrder } = require("./createOrder");
const { changeImage } = require("./changeImage");
const { sendInCloudinary } = require("./sendInCloudinary");
const { clearTemp } = require("./clearTemp");

module.exports = {
  updateDatabase,
  autoFetchCategories,
  autoFetchProducts,
  createCategory,
  createProduct,
  createOrder,
  deleteProducts,
  changeImage,
  sendInCloudinary,
  clearTemp,
};
