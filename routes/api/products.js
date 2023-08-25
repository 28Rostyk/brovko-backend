const express = require("express");
const router = express.Router();

const {
  getProducts,
  deleteContact,
  findProductsByCategory,
  updateDatabase,
} = require("../../controller");

router.get("/", getProducts);
router.delete("/:productId", deleteContact);
router.get("/:categoryId", findProductsByCategory);
router.post("/update-database", updateDatabase);

module.exports = router;
