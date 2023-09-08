// const { updateDatabase } = require("../controller/database/updateDatabase");
const { autoFetchCategories } = require("./autoFetchCategories");
const { autoFetchProducts } = require("./autoFetchProducts");
const { createCategory } = require("./createCategory");
const { createProduct } = require("./createProduct");

module.exports = {
  // updateDatabase,
  autoFetchCategories,
  autoFetchProducts,
  createCategory,
  createProduct,
};
