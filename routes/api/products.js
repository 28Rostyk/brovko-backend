const express = require("express");
const router = express.Router();

const {
  getProducts,
  findProductsByCategory,
  updateDatabase,
  addProduct,
} = require("../../controller");
const { checkNewProductId } = require("../../middlewares");
const { addProductSchema, validateBody } = require("../../schemas");

router.get("/", getProducts);
router.get("/:categoryId", findProductsByCategory);
router.post("/update-database", updateDatabase);
router.post(
  "/add-product",
  checkNewProductId,
  validateBody(addProductSchema),
  addProduct
);

module.exports = router;
