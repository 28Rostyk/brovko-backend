// const { updateDatabase } = require("../controller/database/updateDatabase");
const { autoFetchCategories } = require("./autoFetchCategories");
const { autoFetchProducts } = require("./autoFetchProducts");
const { createCategory } = require("./createCategory");
const { createProduct } = require("./createProduct");
const { deleteProducts } = require("./deleteProducts");
const { createOrder } = require("./createOrder");
const { changeImage } = require("./changeImage");

module.exports = {
  // updateDatabase,
  autoFetchCategories,
  autoFetchProducts,
  createCategory,
  createProduct,
  createOrder,
  deleteProducts,
  changeImage,
};
