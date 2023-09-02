const express = require("express");
const router = express.Router();

const {
  getProducts,
  findProductsByCategory,
  updateDatabase,
  addProduct,
} = require("../../controller");

router.get("/", getProducts);
router.get("/:categoryId", findProductsByCategory);
router.post("/update-database", updateDatabase);
router.post("/add-product", addProduct);

module.exports = router;
