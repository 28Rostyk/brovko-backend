const express = require("express");
const router = express.Router();

const {
  getProducts,
  findProductsByCategory,
  updateDatabase,
} = require("../../controller");

router.get("/", getProducts);
router.get("/:categoryId", findProductsByCategory);
router.post("/update-database", updateDatabase);

module.exports = router;
