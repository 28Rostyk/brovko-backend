const { addProduct } = require("./addProduct");
const { findProductsByCategory } = require("./findProductsByCategory");
const { findProductById } = require("./findProductById");
const { getProducts } = require("./getProducts");
const { removeProducts } = require("./removeProducts");
const { getProductsByKeywords } = require("./getProductsByKeywords");

module.exports = {
  addProduct,
  findProductsByCategory,
  findProductById,
  getProducts,
  removeProducts,
  getProductsByKeywords,
};
