const express = require("express");
const productsRouter = express.Router();

const {
  getProducts,
  findProductsByCategory,
  addProduct,
} = require("../../controller");

const {
  checkNewProductData,
} = require("../../middlewares/checkNewProductData");
const { addProductSchema, validateBody } = require("../../schemas");

productsRouter.get("/", getProducts);
productsRouter.get("/:categoryId", findProductsByCategory);
productsRouter.post(
  "/add-product",
  checkNewProductData,
  validateBody(addProductSchema),
  addProduct
);

module.exports = { productsRouter };
