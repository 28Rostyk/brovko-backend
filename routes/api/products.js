const express = require("express");
const router = express.Router();

const { getProducts, deleteContact } = require("../../controller");

router.get("/", getProducts);
router.delete("/:productId", deleteContact);

module.exports = router;
