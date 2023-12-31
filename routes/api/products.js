const express = require("express");
const productsRouter = express.Router();

const {
  getAllProducts,
  getProductsByCategory,
  findProductById,
  addProduct,
  removeProducts,
  getProductsByKeywords,
} = require("../../controller");

const { checkNewProductData, upload } = require("../../middlewares");
const { addProductSchema, validateBody } = require("../../schemas");

productsRouter.get("/", getAllProducts);
productsRouter.get("/category/:categoryId", getProductsByCategory);
productsRouter.get("/product/:productId", findProductById);
productsRouter.post(
  "/add-product",
  checkNewProductData,
  validateBody(addProductSchema),
  upload.single("fullsize"),
  addProduct
);
productsRouter.post("/remove-product", removeProducts);
productsRouter.get("/search", getProductsByKeywords);

module.exports = { productsRouter };
