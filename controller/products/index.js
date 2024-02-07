const { addProduct } = require("./addProduct");
const { getProductsByCategory } = require("./getProductsByCategory");
const { findProductById } = require("./findProductById");
const { getAllProducts } = require("./getAllProducts");
const { removeProducts } = require("./removeProducts");
const { getProductsByKeywords } = require("./getProductsByKeywords");
const { getProducts } = require("./getProducts");

module.exports = {
  addProduct,
  getProductsByCategory,
  findProductById,
  getAllProducts,
  removeProducts,
  getProductsByKeywords,
  getProducts,
};
