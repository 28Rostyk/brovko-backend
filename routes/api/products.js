const express = require("express");
const router = express.Router();

const {
  getProducts,
  findProductsByCategory,
  updateDatabase,
  addProduct,
} = require("../../controller");
const { checkNewProductData } = require("../../middlewares");
const { addProductSchema, validateBody } = require("../../schemas");

router.get("/", getProducts);
router.get("/:categoryId", findProductsByCategory);
router.post("/update-database", updateDatabase);
router.post(
  "/add-product",
  checkNewProductData,
  validateBody(addProductSchema),
  addProduct
);

module.exports = router;
