const express = require("express");
const productsRouter = express.Router();

const {
  getProducts,
  findProductsByCategory,
  addProduct,
  removeProducts,
} = require("../../controller");

const { checkNewProductData, upload } = require("../../middlewares");
const { addProductSchema, validateBody } = require("../../schemas");

productsRouter.get("/", getProducts);
productsRouter.get("/:categoryId", findProductsByCategory);
productsRouter.post(
  "/add-product",
  checkNewProductData,
  validateBody(addProductSchema),
  upload.single("fullsize"),
  addProduct
);
productsRouter.post("/remove-product", removeProducts);

module.exports = { productsRouter };
