// const { updateDatabase } = require("../controller/database/updateDatabase");
const { updateDatabase } = require("./updateDatabase");
const { autoFetchCategories } = require("./autoFetchCategories");
const { autoFetchProducts } = require("./autoFetchProducts");
const { createCategory } = require("./createCategory");
const { createProduct } = require("./products");

const {
  deleteProducts,
  getAllProductsFromDB,
  getProductsByCategoryFromDB,
  getProductsByKeywordFromDB,
} = require("./products");

const { createOrder } = require("./createOrder");
const { changeImage } = require("./changeImage");
const { sendInCloudinary } = require("./sendInCloudinary");
const { clearTemp } = require("./clearTemp");
const { makeCopyProductFoto } = require("./makeCopyProductFoto");

module.exports = {
  updateDatabase,
  autoFetchCategories,
  autoFetchProducts,
  createCategory,
  createProduct,
  deleteProducts,
  getAllProductsFromDB,
  getProductsByCategoryFromDB,
  getProductsByKeywordFromDB,
  createOrder,
  changeImage,
  sendInCloudinary,
  clearTemp,
  makeCopyProductFoto,
};
