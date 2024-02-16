const { createProduct } = require("./createProduct");
const { deleteProducts } = require("./deleteProducts");
const { getAllProductsFromDB } = require("./getAllProductsFromDB");
const {
  getProductsByCategoryFromDB,
} = require("./getProductsByCategoryFromDB");

const { getProductsByKeywordFromDB } = require("./getProductsByKeywordFromDB");

module.exports = {
  createProduct,
  deleteProducts,
  getAllProductsFromDB,
  getProductsByCategoryFromDB,
  getProductsByKeywordFromDB,
};
