const express = require("express");
const productsRouter = express.Router();

const {
  getProducts,
  findProductsByCategory,
  findProductById,
  addProduct,
  removeProducts,
  getProductsByKeywords,
} = require("../../controller");

const {
  checkNewProductData,
} = require("../../middlewares/checkNewProductData");
const { addProductSchema, validateBody } = require("../../schemas");

productsRouter.get("/", getProducts);
productsRouter.get("/category/:categoryId", findProductsByCategory);
productsRouter.get("/product/:productId", findProductById);
productsRouter.post(
  "/add-product",
  checkNewProductData,
  validateBody(addProductSchema),
  addProduct
);
productsRouter.post("/remove-product", removeProducts);
productsRouter.get("/search", getProductsByKeywords);

module.exports = { productsRouter };
